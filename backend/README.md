
# AI Food Packaging Recommendation — V1

## What this prototype does

Food/storage inputs
-> Random Forest multi-output classifier
-> predicted packaging requirements
-> packaging-material knowledge base
-> compatibility scoring
-> top 3 material recommendations

## Important

The supplied CSVs contain starter/prototype values and labels. They are NOT a scientifically validated production dataset.

Before SIH/final deployment:
1. Replace prototype values with verified literature, standards, and supplier technical data.
2. Record OTR/WVTR test conditions and film thickness.
3. Have packaging/food-domain experts review labels.
4. Expand the dataset substantially.
5. Evaluate with a held-out validation dataset.

## Run

Install:
    pip install -r requirements.txt

Train:
    python train_model.py

Test recommendation:
    python recommend.py

Run API:
    uvicorn api:app --reload

Then POST JSON to:
    /recommend

Example:
{
  "food_category": "Fresh Vegetable",
  "moisture_percent": 94,
  "fat_percent": 0.2,
  "ph": 4.3,
  "respiration_rate": "High",
  "target_shelf_life_days": 15,
  "storage_temperature_c": 5,
  "relative_humidity_percent": 90,
  "storage_type": "Chilled",
  "transportation": "Refrigerated",
  "moisture_sensitivity": "High",
  "oxygen_sensitivity": "High"
}
