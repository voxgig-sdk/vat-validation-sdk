# Typed models for the VatValidation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Country(TypedDict):
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


class CountryListMatch(TypedDict, total=False):
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


class Currency(TypedDict):
    name: str
    symbol: str


class CurrencyLoadMatch(TypedDict, total=False):
    name: str
    symbol: str


class Geolocate(TypedDict):
    pass


class GeolocateLoadMatch(TypedDict):
    pass


class Rate(TypedDict):
    pass


class RateLoadMatch(TypedDict):
    pass


class ValidateIbanResponseSchema(TypedDict):
    account_number: str
    bank_code: str
    bank_name: str
    bban: str
    bic: str
    branch_code: str
    checksum_digits: str
    country_code: str
    country_name: str
    iban: str
    in_sepa_zone: bool
    valid: bool


class ValidateIbanResponseSchemaLoadMatch(TypedDict, total=False):
    account_number: str
    bank_code: str
    bank_name: str
    bban: str
    bic: str
    branch_code: str
    checksum_digits: str
    country_code: str
    country_name: str
    iban: str
    in_sepa_zone: bool
    valid: bool


class ValidateVatResponseSchema(TypedDict):
    pass


class ValidateVatResponseSchemaLoadMatch(TypedDict):
    pass


class VatcomplyApiRoot(TypedDict):
    pass


class VatcomplyApiRootLoadMatch(TypedDict):
    pass
