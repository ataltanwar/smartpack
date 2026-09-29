import pandas as pd
from pathlib import Path
from joblib import dump

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE = Path(__file__).resolve().parent
DATA = BASE / "data"

training_path = DATA / "training_data.csv"
model_path = BASE / "packaging_requirement_model.joblib"


# --------------------------------------------------
# LOAD TRAINING DATA
# --------------------------------------------------

print("Loading training dataset...")

df = pd.read_csv(training_path)

print(f"Training records: {len(df)}")
print(f"Training features: {len(df.columns)}")


# --------------------------------------------------
# FEATURES
# --------------------------------------------------

features = [
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


# --------------------------------------------------
# TARGETS
# --------------------------------------------------

targets = [
    "required_otr_level",
    "required_wvtr_level",
    "required_mechanical_strength",
    "required_sealability",
    "map_required",
    "breathability_required",
]


# --------------------------------------------------
# VALIDATE COLUMNS
# --------------------------------------------------

missing = [
    column
    for column in features + targets
    if column not in df.columns
]

if missing:
    print("\nMissing columns:")
    for column in missing:
        print(f" - {column}")

    raise ValueError(
        "Training dataset is missing required columns."
    )


# --------------------------------------------------
# INPUT / OUTPUT
# --------------------------------------------------

X = df[features]
y = df[targets]


# --------------------------------------------------
# CATEGORICAL FEATURES
# --------------------------------------------------

categorical = [
    "food_category",
    "respiration_rate",
    "storage_type",
    "transportation",
    "moisture_sensitivity",
    "oxygen_sensitivity",
]


# --------------------------------------------------
# NUMERIC FEATURES
# --------------------------------------------------

numeric = [
    column
    for column in features
    if column not in categorical
]


# --------------------------------------------------
# PREPROCESSING
# --------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical,
        ),
        (
            "num",
            "passthrough",
            numeric,
        ),
    ]
)


# --------------------------------------------------
# RANDOM FOREST
# --------------------------------------------------

base_model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    class_weight="balanced",
)


# --------------------------------------------------
# MULTI-OUTPUT MODEL
# --------------------------------------------------

model = Pipeline([
    (
        "preprocessor",
        preprocessor,
    ),
    (
        "model",
        MultiOutputClassifier(base_model),
    ),
])


# --------------------------------------------------
# TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
)


print("\nTraining model...")

model.fit(X_train, y_train)


# --------------------------------------------------
# VALIDATION
# --------------------------------------------------

pred = model.predict(X_test)


print("\n======================================")
print("BASELINE MODEL VALIDATION")
print("======================================")


accuracies = []

for i, column in enumerate(targets):

    score = accuracy_score(
        y_test.iloc[:, i],
        pred[:, i],
    )

    accuracies.append(score)

    print(
        f"{column}: {score:.2f}"
    )


overall_accuracy = sum(accuracies) / len(accuracies)

print("--------------------------------------")
print(
    f"Average accuracy: {overall_accuracy:.2f}"
)


# --------------------------------------------------
# SAVE MODEL
# --------------------------------------------------

dump(
    model,
    model_path,
)


print("\nModel saved successfully:")
print(model_path)