// Typed models for the VatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Country {
  capital: string
  currency: string
  emoji: string
  iso2: string
  iso3: string
  latitude: number
  longitude: number
  name: string
  numeric_code: number
  phone_code: string
  region: string
  subregion: string
  tld: string
}

export interface CountryListMatch {
  capital?: string
  currency?: string
  emoji?: string
  iso2?: string
  iso3?: string
  latitude?: number
  longitude?: number
  name?: string
  numeric_code?: number
  phone_code?: string
  region?: string
  subregion?: string
  tld?: string
}

export interface Currency {
  name: string
  symbol: string
}

export interface CurrencyLoadMatch {
  name?: string
  symbol?: string
}

export interface Geolocate {
}

export interface GeolocateLoadMatch {
}

export interface Rate {
}

export interface RateLoadMatch {
}

export interface ValidateIbanResponseSchema {
  account_number: string
  bank_code: string
  bank_name: string
  bban: string
  bic: string
  branch_code: string
  checksum_digits: string
  country_code: string
  country_name: string
  iban: string
  in_sepa_zone: boolean
  valid: boolean
}

export interface ValidateIbanResponseSchemaLoadMatch {
  account_number?: string
  bank_code?: string
  bank_name?: string
  bban?: string
  bic?: string
  branch_code?: string
  checksum_digits?: string
  country_code?: string
  country_name?: string
  iban?: string
  in_sepa_zone?: boolean
  valid?: boolean
}

export interface ValidateVatResponseSchema {
}

export interface ValidateVatResponseSchemaLoadMatch {
}

export interface VatcomplyApiRoot {
}

export interface VatcomplyApiRootLoadMatch {
}

