import pandas as pd
from pathlib import Path


BASE = Path(__file__).resolve().parent
DATA = BASE / "data"

food_path = DATA / "food_commodities.csv"
relationship_path = DATA / "food_packaging_relationships.csv"
output_path = DATA / "training_data.csv"



print("Loading datasets...")

food = pd.read_csv(food_path)
relationships = pd.read_csv(relationship_path)



if "commodity" not in food.columns:
    raise ValueError(
        "food_commodities.csv must contain a 'commodity' column."
    )

if "commodity" not in relationships.columns:
    raise ValueError(
        "food_packaging_relationships.csv must contain a 'commodity' column."
    )


print(f"Food records: {len(food)}")
print(f"Relationship records: {len(relationships)}")


# MERGE FOOD FEATURES + PACKAGING REQUIREMENTS

df = food.merge(
    relationships,
    on="commodity",
    how="inner",
    suffixes=("", "_relationship")
)


# FEATURES USED BY ML MODEL

features = [
    "commodity",
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


# TARGETS PREDICTED BY ML MODEL

targets = [
    "required_otr_level",
    "required_wvtr_level",
    "required_mechanical_strength",
    "required_sealability",
    "map_required",
    "breathability_required",
]


# CHECK REQUIRED COLUMNS

required_columns = features + targets

missing_columns = [
    column for column in required_columns
    if column not in df.columns
]

if missing_columns:
    print("\nERROR: Missing columns:")
    for column in missing_columns:
        print(f" - {column}")

    raise ValueError(
        "The source CSV files do not contain all required columns."
    )


# CREATE TRAINING DATASET
training_data = df[required_columns].copy()


# REMOVE DUPLICATE RECORDS
before = len(training_data)

training_data = training_data.drop_duplicates()

after = len(training_data)

print(f"\nRemoved duplicates: {before - after}")


# HANDLE MISSING VALUES

missing_before = training_data.isna().sum().sum()

print(f"Missing values before cleaning: {missing_before}")

# Remove rows where target values are missing.
training_data = training_data.dropna(subset=targets)

# Fill numeric feature missing values with median.
numeric_features = [
    "moisture_percent",
    "fat_percent",
    "ph",
    "target_shelf_life_days",
    "storage_temperature_c",
    "relative_humidity_percent",
]

for column in numeric_features:
    if column in training_data.columns:
        training_data[column] = training_data[column].fillna(
            training_data[column].median()
        )

# Fill categorical feature missing values.
categorical_features = [
    "commodity",
    "food_category",
    "respiration_rate",
    "storage_type",
    "transportation",
    "moisture_sensitivity",
    "oxygen_sensitivity",
]

for column in categorical_features:
    if column in training_data.columns:
        training_data[column] = training_data[column].fillna("Unknown")


# SAVE TRAINING DATA

training_data.to_csv(
    output_path,
    index=False
)


# SUMMARY

print("\n======================================")
print("TRAINING DATASET CREATED")
print("======================================")

print(f"Rows: {len(training_data)}")
print(f"Columns: {len(training_data.columns)}")
print(f"Saved to: {output_path}")

print("\nTraining columns:")
for column in training_data.columns:
    print(f" - {column}")

print("\nDataset preview:")
print(training_data.head())