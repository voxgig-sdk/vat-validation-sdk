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

export type CountryListMatch = Partial<Country>

export interface Currency {
  name: string
  symbol: string
}

export type CurrencyLoadMatch = Partial<Currency>

export interface Geolocate {
  capital: string
  country_code: string
  currency: string
  emoji: string
  ip: any
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

export type GeolocateLoadMatch = Partial<Geolocate>

export interface Rate {
  base: string
  date: string
  rate: Record<string, any>
}

export type RateLoadMatch = Partial<Rate>

export interface ValidateIbanResponseSchema {
  account_number: string
  bank_code: string
  bank_name: string
  bban: string
  bic: string
  branch_code: string
  checksum_digit: string
  country_code: string
  country_name: string
  iban: string
  in_sepa_zone: boolean
  valid: boolean
}

export type ValidateIbanResponseSchemaLoadMatch = Partial<ValidateIbanResponseSchema>

export interface ValidateVatResponseSchema {
  address?: string
  country_code: string
  name?: string
  valid: boolean
  vat_number: string
}

export type ValidateVatResponseSchemaLoadMatch = Partial<ValidateVatResponseSchema>

export interface VatcomplyApiRoot {
  contact: string
  description: string
  documentation: string
  endpoint: Record<string, any>
  name: string
  status: string
  version: string
}

export type VatcomplyApiRootLoadMatch = Partial<VatcomplyApiRoot>

