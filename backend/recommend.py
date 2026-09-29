import pandas as pd
import numpy as np
from pathlib import Path
from joblib import load


# ============================================================
# PATHS
# ============================================================

BASE = Path(__file__).resolve().parent
DATA = BASE / "data"

MODEL_PATH = BASE / "packaging_requirement_model.joblib"
MATERIALS_PATH = DATA / "packaging_materials.csv"
BIO_MATERIALS_PATH = DATA / "bio_packaging_materials.csv"
FOODS_PATH = DATA / "food_commodities.csv"


# ============================================================
# LOAD MODEL + DATABASES
# ============================================================

MODEL = load(MODEL_PATH)

MATERIALS = pd.read_csv(MATERIALS_PATH)
BIO_MATERIALS = pd.read_csv(BIO_MATERIALS_PATH)

FOODS = pd.read_csv(FOODS_PATH)



# ML FEATURES

FEATURES = [
    "food_category",
    "moisture_percent",
    "fat_percent",
    "ph",
    "respiration_rate",
    "target_shelf_life_days",
    "storage_temperature_c",
    "relative_humidity_percent",
    "storage_type",
    "transportation",
    "moisture_sensitivity",
    "oxygen_sensitivity",
]


# ============================================================
# ML TARGETS
# ============================================================

TARGETS = [
    "required_otr_level",
    "required_wvtr_level",
    "required_mechanical_strength",
    "required_sealability",
    "map_required",
    "breathability_required",
]


# ============================================================
# QUALITATIVE LEVELS
# ============================================================

LEVELS = {
    "Very Low": 0,
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "Very High": 4,
}


def normalize_level(value):
    """
    Convert qualitative packaging requirements
    into a numeric scale from 0 to 4.
    """

    value = str(value).strip()

    return LEVELS.get(value, 2)


# ============================================================
# BASIC COMPATIBILITY
# ============================================================

def compatibility(requirement, material_value):
    """
    Measures how closely a material property matches
    the requirement predicted by the ML model.

    Returns a value between 0 and 1.
    """

    requirement = normalize_level(requirement)
    material_value = normalize_level(material_value)

    distance = abs(requirement - material_value)

    return max(
        0.0,
        1.0 - (distance / 4.0)
    )


# ============================================================
# FOOD-SPECIFIC WEIGHTS
# ============================================================

def get_property_weights(profile):
    """
    Assign different importance to packaging properties
    depending on the type and sensitivity of the food.

    This prevents every food from being scored identically.
    """

    category = str(
        profile.get("food_category", "")
    ).lower()

    moisture_sensitivity = str(
        profile.get("moisture_sensitivity", "")
    ).lower()

    oxygen_sensitivity = str(
        profile.get("oxygen_sensitivity", "")
    ).lower()

    respiration = str(
        profile.get("respiration_rate", "")
    ).lower()

    # --------------------------------------------------------
    # Default weights
    # --------------------------------------------------------

    weights = {
        "otr": 0.20,
        "wvtr": 0.20,
        "strength": 0.15,
        "sealability": 0.15,
        "map": 0.15,
        "breathability": 0.15,
    }

    # --------------------------------------------------------
    # Fresh fruits / vegetables
    # --------------------------------------------------------

    if (
        "vegetable" in category
        or "fruit" in category
        or "fresh" in category
        or "produce" in category
    ):

        weights = {
            "otr": 0.20,
            "wvtr": 0.15,
            "strength": 0.10,
            "sealability": 0.10,
            "map": 0.15,
            "breathability": 0.30,
        }

    # --------------------------------------------------------
    # High respiration foods
    # --------------------------------------------------------

    if respiration in (
        "high",
        "very high",
    ):

        weights["breathability"] += 0.10
        weights["otr"] -= 0.05
        weights["map"] -= 0.05

    # --------------------------------------------------------
    # Moisture-sensitive foods
    # --------------------------------------------------------

    if moisture_sensitivity in (
        "high",
        "very high",
    ):

        weights["wvtr"] += 0.10
        weights["breathability"] -= 0.05
        weights["map"] -= 0.05

    # --------------------------------------------------------
    # Oxygen-sensitive foods
    # --------------------------------------------------------

    if oxygen_sensitivity in (
        "high",
        "very high",
    ):

        weights["otr"] += 0.10
        weights["wvtr"] -= 0.05
        weights["breathability"] -= 0.05

    # --------------------------------------------------------
    # Normalize weights
    # --------------------------------------------------------

    total = sum(weights.values())

    weights = {
        key: value / total
        for key, value in weights.items()
    }

    return weights


# ============================================================
# COMMODITY LOOKUP
# ============================================================

def get_commodity_profile(commodity):

    matches = FOODS[
        FOODS["commodity"].astype(str).str.lower()
        == commodity.strip().lower()
    ]

    if matches.empty:

        available = FOODS["commodity"].tolist()

        raise ValueError(
            f"Commodity '{commodity}' not found. "
            f"Available commodities: {', '.join(available)}"
        )

    return matches.iloc[0].to_dict()


# ============================================================
# MAP COMPATIBILITY
# ============================================================

def map_compatibility(requirement, material_value):
    """
    Handles MAP suitability separately because MAP is
    a categorical suitability property rather than a
    simple barrier-level measurement.
    """

    requirement = str(requirement).strip()
    material_value = str(material_value).strip().lower()

    # MAP not required.
    # We don't penalize materials simply because they
    # support MAP when MAP isn't needed.
    if requirement == "No":
        return 1.0

    # MAP required.
    if requirement == "Yes":

        if material_value in ("high", "suitable"):
            return 1.0

        if material_value in ("medium", "limited"):
            return 0.65

        if material_value in ("low",):
            return 0.25

        return 0.0

    # Conditional MAP requirement.
    if requirement == "Conditional":

        if material_value in ("high", "suitable"):
            return 1.0

        if material_value in ("medium", "limited"):
            return 0.80

        if material_value in ("low",):
            return 0.50

        return 0.25

    return 0.5


# ============================================================
# GENERATE EXPLANATION
# ============================================================

def generate_explanation(
    requirements,
    material,
    component_scores,
    weights,
):
    """
    Creates human-readable reasons for the recommendation.
    """

    reasons = []
    limitations = []

    property_names = {
        "otr": "Oxygen barrier",
        "wvtr": "Moisture barrier",
        "strength": "Mechanical strength",
        "sealability": "Sealability",
        "map": "MAP suitability",
        "breathability": "Breathability",
    }

    # --------------------------------------------------------
    # Strong matches
    # --------------------------------------------------------

    for key, score in component_scores.items():

        if score >= 0.85:

            reasons.append(
                f"{property_names[key]} strongly matches the predicted requirement"
            )

        elif score >= 0.70:

            reasons.append(
                f"{property_names[key]} reasonably matches the predicted requirement"
            )

        elif score < 0.50:

            limitations.append(
                f"{property_names[key]} has a weak match"
            )

    # --------------------------------------------------------
    # Food-specific explanations
    # --------------------------------------------------------

    if (
        requirements["breathability_required"]
        in ("High", "Very High")
    ):

        if component_scores["breathability"] >= 0.75:

            reasons.append(
                "Suitable breathability for the predicted respiration requirement"
            )

    if requirements["map_required"] == "Yes":

        if component_scores["map"] >= 0.75:

            reasons.append(
                "Suitable for the predicted MAP requirement"
            )

        else:

            limitations.append(
                "MAP suitability does not fully match the requirement"
            )

    # --------------------------------------------------------
    # Cost information
    # --------------------------------------------------------

    cost = str(
        material.get("cost_level", "")
    )

    if cost.lower() == "low":

        reasons.append(
            "Relatively low cost option"
        )

    elif cost.lower() == "high":

        limitations.append(
            "Higher cost compared with lower-cost alternatives"
        )

    return reasons[:5], limitations[:3]


# ============================================================
# SHELF-LIFE ESTIMATION ENGINE (PackAI PRD §9.5)
# ============================================================

def estimate_shelf_life(
    profile,
    compatibility_score,
    material,
    requirements,
    storage_temp=None,
):
    """
    Estimates expected shelf-life range (in days) based on packaging material
    barrier compatibility, commodity respiration kinetics, and storage temperature.
    (Heuristic estimation per PackAI PRD §9.5 - early-stage decision support).
    """
    base_days = float(profile.get("target_shelf_life_days") or 14)
    std_temp = float(profile.get("storage_temperature_c") or 10)
    actual_temp = float(storage_temp if storage_temp is not None else std_temp)
    category = str(profile.get("food_category") or "")
    respiration = str(profile.get("respiration_rate") or "Medium")

    is_perishable = category in [
        "Fresh Fruit",
        "Fresh Vegetable",
        "Root Vegetable",
        "Leafy Green",
        "Dairy",
        "Bakery",
    ] or respiration in ["High", "Very High"]

    q10 = 2.0 if is_perishable else 1.25
    delta_t = actual_temp - std_temp

    if delta_t > 0:
        temp_factor = max(0.30, q10 ** (-delta_t / 10.0))
    elif delta_t < 0:
        temp_factor = min(1.40, q10 ** (-delta_t / 15.0))
    else:
        temp_factor = 1.0

    score = float(compatibility_score)
    if score >= 90:
        compat_min, compat_max = 1.05, 1.25
        status = "Extended"
        status_color = "emerald"
    elif score >= 80:
        compat_min, compat_max = 0.90, 1.08
        status = "Optimal"
        status_color = "blue"
    elif score >= 70:
        compat_min, compat_max = 0.70, 0.90
        status = "Moderate"
        status_color = "amber"
    else:
        compat_min, compat_max = 0.45, 0.68
        status = "Reduced"
        status_color = "rose"

    min_days = max(1, int(round(base_days * temp_factor * compat_min)))
    max_days = max(min_days, int(round(base_days * temp_factor * compat_max)))

    if min_days == max_days:
        display = f"~{min_days} days"
    else:
        display = f"~{min_days}-{max_days} days"

    if score >= 85:
        rationale = f"High barrier compatibility maintains internal atmosphere, extending shelf life to {display} at {round(actual_temp)}°C."
    elif score >= 70:
        rationale = f"Satisfactory protection for short-to-medium holding ({display}); minor barrier gaps may limit extended storage."
    else:
        rationale = f"Reduced holding window ({display}) due to barrier mismatches or condensation/permeability risks."

    return {
        "estimated_days_min": min_days,
        "estimated_days_max": max_days,
        "display": display,
        "status": status,
        "status_color": status_color,
        "rationale": rationale,
        "baseline_reference_days": int(round(base_days)),
        "is_estimate": True,
    }


# ============================================================
# MAIN RECOMMENDATION ENGINE
# ============================================================

def recommend_from_commodity(
    commodity,
    shelf_life_days=None,
    storage_temperature_c=None,
    relative_humidity_percent=None,
    storage_type=None,
    transportation=None,
    top_n=3,
    include_eco_alternative=True,
):

    # ========================================================
    # STEP 1
    # FIND FOOD PROFILE
    # ========================================================

    profile = get_commodity_profile(commodity)


    # ========================================================
    # STEP 2
    # BUILD ML INPUT
    # ========================================================

    input_data = {

        "food_category":
            profile["food_category"],

        "moisture_percent":
            profile["moisture_percent"],

        "fat_percent":
            profile["fat_percent"],

        "ph":
            profile["ph"],

        "respiration_rate":
            profile["respiration_rate"],

        "target_shelf_life_days":
            (
                shelf_life_days
                if shelf_life_days is not None
                else profile["target_shelf_life_days"]
            ),

        "storage_temperature_c":
            (
                storage_temperature_c
                if storage_temperature_c is not None
                else profile["storage_temperature_c"]
            ),

        "relative_humidity_percent":
            (
                relative_humidity_percent
                if relative_humidity_percent is not None
                else profile["relative_humidity_percent"]
            ),

        "storage_type":
            (
                storage_type
                if storage_type is not None
                else profile["storage_type"]
            ),

        "transportation":
            (
                transportation
                if transportation is not None
                else profile["transportation"]
            ),

        "moisture_sensitivity":
            profile["moisture_sensitivity"],

        "oxygen_sensitivity":
            profile["oxygen_sensitivity"],
    }


    # ========================================================
    # STEP 3
    # ML PREDICTION
    # ========================================================

    row = pd.DataFrame(
        [input_data]
    )[FEATURES]

    prediction = MODEL.predict(row)[0]

    requirements = dict(
        zip(
            TARGETS,
            prediction
        )
    )


    # ========================================================
    # STEP 4
    # FOOD-SPECIFIC WEIGHTS
    # ========================================================

    weights = get_property_weights(profile)


    # ========================================================
    # STEP 5
    # SCORE PACKAGING MATERIALS
    # ========================================================

    scored_materials = []


    for _, material in MATERIALS.iterrows():

        # ----------------------------------------------------
        # Individual property scores
        # ----------------------------------------------------

        otr_score = compatibility(
            requirements["required_otr_level"],
            material["otr_level"],
        )

        wvtr_score = compatibility(
            requirements["required_wvtr_level"],
            material["wvtr_level"],
        )

        strength_score = compatibility(
            requirements["required_mechanical_strength"],
            material["mechanical_strength"],
        )

        sealability_score = compatibility(
            requirements["required_sealability"],
            material["sealability"],
        )

        # ----------------------------------------------------
        # Breathability
        # ----------------------------------------------------

        breathability_score = compatibility(
            requirements["breathability_required"],
            material["gas_permeability"],
        )

        # If the food does not need significant
        # breathability, don't allow this property
        # to dominate the recommendation.

        if requirements["breathability_required"] in (
            "Low",
            "Very Low",
        ):

            breathability_score = 0.75

        # ----------------------------------------------------
        # MAP
        # ----------------------------------------------------

        map_score = map_compatibility(
            requirements["map_required"],
            material["map_suitability"],
        )


        # ----------------------------------------------------
        # Component scores
        # ----------------------------------------------------

        component_scores = {

            "otr":
                otr_score,

            "wvtr":
                wvtr_score,

            "strength":
                strength_score,

            "sealability":
                sealability_score,

            "map":
                map_score,

            "breathability":
                breathability_score,
        }


        # ====================================================
        # WEIGHTED FINAL SCORE
        # ====================================================

        weighted_score = (

            component_scores["otr"]
            * weights["otr"]

            +

            component_scores["wvtr"]
            * weights["wvtr"]

            +

            component_scores["strength"]
            * weights["strength"]

            +

            component_scores["sealability"]
            * weights["sealability"]

            +

            component_scores["map"]
            * weights["map"]

            +

            component_scores["breathability"]
            * weights["breathability"]
        )


        score = float(
            weighted_score * 100
        )


        # ====================================================
        # EXPLANATION
        # ====================================================

        reasons, limitations = generate_explanation(
            requirements,
            material,
            component_scores,
            weights,
        )


        # ====================================================
        # RESULT OBJECT
        # ====================================================

        scored_materials.append({

            # Existing frontend fields
            "material":
                material["material"],

            "compatibility_score":
                round(score, 1),

            "material_type":
                material["material_type"],

            "otr_level":
                material["otr_level"],

            "wvtr_level":
                material["wvtr_level"],

            "mechanical_strength":
                material["mechanical_strength"],

            "sealability":
                material["sealability"],

            "gas_permeability":
                material["gas_permeability"],

            "map_suitability":
                material["map_suitability"],

            "cost_level":
                material["cost_level"],

            "recyclability_or_end_of_life":
                material[
                    "recyclability_or_end_of_life"
                ],

            # New AI explanation fields
            "score_breakdown": {

                "otr":
                    round(otr_score * 100, 1),

                "wvtr":
                    round(wvtr_score * 100, 1),

                "strength":
                    round(strength_score * 100, 1),

                "sealability":
                    round(sealability_score * 100, 1),

                "map":
                    round(map_score * 100, 1),

                "breathability":
                    round(breathability_score * 100, 1),
            },

            "recommendation_reasons":
                reasons,

            "limitations":
                limitations,

            "estimated_shelf_life":
                estimate_shelf_life(
                    profile=profile,
                    compatibility_score=score,
                    material=material,
                    requirements=requirements,
                    storage_temp=input_data["storage_temperature_c"],
                ),
        })


    # ========================================================
    # STEP 6
    # SORT
    # ========================================================

    scored_materials.sort(
        key=lambda item:
            item["compatibility_score"],
        reverse=True,
    )

    # Score bio-based materials separately so the eco alternative
    # remains visible even when conventional materials rank higher.
    eco_materials = []

    for _, material in BIO_MATERIALS.iterrows():
        component_scores = {
            "otr": compatibility(requirements["required_otr_level"], material["otr_level"]),
            "wvtr": compatibility(requirements["required_wvtr_level"], material["wvtr_level"]),
            "strength": compatibility(requirements["required_mechanical_strength"], material["mechanical_strength"]),
            "sealability": compatibility(requirements["required_sealability"], material["sealability"]),
            "map": map_compatibility(requirements["map_required"], material["map_suitability"]),
            "breathability": compatibility(requirements["breathability_required"], material["gas_permeability"]),
        }

        if requirements["breathability_required"] in ("Low", "Very Low"):
            component_scores["breathability"] = 0.75

        weighted_score = sum(
            component_scores[key] * weights[key]
            for key in component_scores
        )
        reasons, limitations = generate_explanation(
            requirements, material, component_scores, weights
        )

        eco_materials.append({
            "material": material["material"],
            "compatibility_score": round(float(weighted_score * 100), 1),
            "material_type": material["material_type"],
            "otr_level": material["otr_level"],
            "wvtr_level": material["wvtr_level"],
            "mechanical_strength": material["mechanical_strength"],
            "sealability": material["sealability"],
            "gas_permeability": material["gas_permeability"],
            "map_suitability": material["map_suitability"],
            "cost_level": material["cost_level"],
            "recyclability_or_end_of_life": material["recyclability_or_end_of_life"],
            "score_breakdown": {
                key: round(value * 100, 1)
                for key, value in component_scores.items()
            },
            "recommendation_reasons": reasons,
            "limitations": limitations,
            "estimated_shelf_life": estimate_shelf_life(
                profile=profile,
                compatibility_score=weighted_score * 100,
                material=material,
                requirements=requirements,
                storage_temp=input_data["storage_temperature_c"],
            ),
        })

    eco_materials.sort(
        key=lambda item: item["compatibility_score"],
        reverse=True,
    )


    # ========================================================
    # STEP 7
    # RETURN RESULT
    # ========================================================

    return {

        "commodity":
            profile["commodity"],


        "food_profile": {

            "food_category":
                profile["food_category"],

            "moisture_percent":
                profile["moisture_percent"],

            "fat_percent":
                profile["fat_percent"],

            "ph":
                profile["ph"],

            "respiration_rate":
                profile["respiration_rate"],

            "baseline_shelf_life_days":
                profile["target_shelf_life_days"],

            "moisture_sensitivity":
                profile["moisture_sensitivity"],

            "oxygen_sensitivity":
                profile["oxygen_sensitivity"],
        },


        "conditions_used": {

            "target_shelf_life_days":
                input_data[
                    "target_shelf_life_days"
                ],

            "storage_temperature_c":
                input_data[
                    "storage_temperature_c"
                ],

            "relative_humidity_percent":
                input_data[
                    "relative_humidity_percent"
                ],

            "storage_type":
                input_data[
                    "storage_type"
                ],

            "transportation":
                input_data[
                    "transportation"
                ],
        },


        "predicted_requirements":
            requirements,


        "scoring_weights":
            {
                key: round(value, 3)
                for key, value in weights.items()
            },


        "recommendations":
            scored_materials[:top_n],

        "eco_recommendation":
            (eco_materials[:1] if include_eco_alternative else []),

        "eco_alternative":
            ((eco_materials[0] if eco_materials else None) if include_eco_alternative else None),
    }


# ============================================================
# DIRECT TEST
# ============================================================

if __name__ == "__main__":

    import json


    result = recommend_from_commodity(

        commodity="Tomato",

        shelf_life_days=15,

        storage_temperature_c=5,

        relative_humidity_percent=90,

        storage_type="Chilled",

        transportation="Refrigerated",
    )


    print(
        json.dumps(
            result,
            indent=2,
            default=str,
        )
    )