import os
from fastapi import FastAPI, HTTPException

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field

from typing import Optional

from recommend import (
    recommend_from_commodity,
    FOODS
)


# ------------------------------------------------------
# CREATE FASTAPI APPLICATION
# ------------------------------------------------------

app = FastAPI(

    title="AI Food Packaging Recommendation API",

    description=(
        "AI-powered food packaging "
        "material recommendation system"
    ),

    version="2.0.0"
)


# ------------------------------------------------------
# CORS
# ------------------------------------------------------
# Allows your React frontend (both local development and 
# production deployment on Vercel) to communicate with FastAPI.
# Configure ALLOWED_ORIGINS env var with comma-separated origins,
# or defaults to allowing all origins ("*") and all Vercel domains.
# ------------------------------------------------------

raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
if raw_origins.strip() == "*":
    allow_origins = ["*"]
    allow_credentials = False
else:
    allow_origins = [orig.strip() for orig in raw_origins.split(",") if orig.strip()]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_origin_regex=r"^https://.*\.vercel\.app$" if allow_origins != ["*"] else None,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------
# REQUEST MODEL
# ------------------------------------------------------

class RecommendationInput(BaseModel):

    # Example:
    # Tomato, Apple, Rice, Potato etc.

    commodity: str


    # User can override default shelf life

    shelf_life_days: Optional[int] = Field(

        default=None,

        gt=0
    )


    # Storage temperature

    storage_temperature_c: Optional[float] = None


    # Relative humidity

    relative_humidity_percent: Optional[float] = Field(

        default=None,

        ge=0,

        le=100
    )


    # Ambient / Chilled / Frozen

    storage_type: Optional[str] = None


    # Transportation condition

    transportation: Optional[str] = None


    # Eco alternative toggle

    include_eco_alternative: Optional[bool] = True


# ------------------------------------------------------
# HOME ENDPOINT
# ------------------------------------------------------

@app.get("/")
def root():

    return {

        "message":
            "Packaging AI API is running",

        "version":
            "2.0.0"
    }


# ------------------------------------------------------
# GET AVAILABLE COMMODITIES
# ------------------------------------------------------

@app.get("/commodities")
def commodities():

    return {

        "commodities":
            FOODS["commodity"].tolist()
    }

# ------------------------------------------------------
# PACKAGING RECOMMENDATION
# ------------------------------------------------------

@app.post("/recommend")
def get_recommendation(
    data: RecommendationInput
):

    try:

        result = recommend_from_commodity(

            commodity=data.commodity,

            shelf_life_days=
                data.shelf_life_days,

            storage_temperature_c=
                data.storage_temperature_c,

            relative_humidity_percent=
                data.relative_humidity_percent,

            storage_type=
                data.storage_type,

            transportation=
                data.transportation,

            include_eco_alternative=
                data.include_eco_alternative,
        )


        return result


    except ValueError as error:

        raise HTTPException(

            status_code=404,

            detail=str(error)
        )