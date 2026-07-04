# Typed models for the VatValidation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Country:
    capital: str
    currency: str
    emoji: str
    iso2: str
    iso3: str
    latitude: float
    longitude: float
    name: str
    numeric_code: int
    phone_code: str
    region: str
    subregion: str
    tld: str


@dataclass
class CountryListMatch:
    capital: Optional[str] = None
    currency: Optional[str] = None
    emoji: Optional[str] = None
    iso2: Optional[str] = None
    iso3: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    numeric_code: Optional[int] = None
    phone_code: Optional[str] = None
    region: Optional[str] = None
    subregion: Optional[str] = None
    tld: Optional[str] = None


@dataclass
class Currency:
    name: str
    symbol: str


@dataclass
class CurrencyLoadMatch:
    name: Optional[str] = None
    symbol: Optional[str] = None


@dataclass
class Geolocate:
    capital: str
    country_code: str
    currency: str
    emoji: str
    ip: Any
    iso2: str
    iso3: str
    latitude: float
    longitude: float
    name: str
    numeric_code: int
    phone_code: str
    region: str
    subregion: str
    tld: str


@dataclass
class GeolocateLoadMatch:
    capital: Optional[str] = None
    country_code: Optional[str] = None
    currency: Optional[str] = None
    emoji: Optional[str] = None
    ip: Optional[Any] = None
    iso2: Optional[str] = None
    iso3: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    numeric_code: Optional[int] = None
    phone_code: Optional[str] = None
    region: Optional[str] = None
    subregion: Optional[str] = None
    tld: Optional[str] = None


@dataclass
class Rate:
    base: str
    date: str
    rate: dict


@dataclass
class RateLoadMatch:
    base: Optional[str] = None
    date: Optional[str] = None
    rate: Optional[dict] = None


@dataclass
class ValidateIbanResponseSchema:
    account_number: str
    bank_code: str
    bank_name: str
    bban: str
    bic: str
    branch_code: str
    checksum_digit: str
    country_code: str
    country_name: str
    iban: str
    in_sepa_zone: bool
    valid: bool


@dataclass
class ValidateIbanResponseSchemaLoadMatch:
    account_number: Optional[str] = None
    bank_code: Optional[str] = None
    bank_name: Optional[str] = None
    bban: Optional[str] = None
    bic: Optional[str] = None
    branch_code: Optional[str] = None
    checksum_digit: Optional[str] = None
    country_code: Optional[str] = None
    country_name: Optional[str] = None
    iban: Optional[str] = None
    in_sepa_zone: Optional[bool] = None
    valid: Optional[bool] = None


@dataclass
class ValidateVatResponseSchema:
    country_code: str
    valid: bool
    vat_number: str
    address: Optional[str] = None
    name: Optional[str] = None


@dataclass
class ValidateVatResponseSchemaLoadMatch:
    address: Optional[str] = None
    country_code: Optional[str] = None
    name: Optional[str] = None
    valid: Optional[bool] = None
    vat_number: Optional[str] = None


@dataclass
class VatcomplyApiRoot:
    contact: str
    description: str
    documentation: str
    endpoint: dict
    name: str
    status: str
    version: str


@dataclass
class VatcomplyApiRootLoadMatch:
    contact: Optional[str] = None
    description: Optional[str] = None
    documentation: Optional[str] = None
    endpoint: Optional[dict] = None
    name: Optional[str] = None
    status: Optional[str] = None
    version: Optional[str] = None

