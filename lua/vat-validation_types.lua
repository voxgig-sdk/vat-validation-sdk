-- Typed models for the VatValidation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Country
---@field capital string
---@field currency string
---@field emoji string
---@field iso2 string
---@field iso3 string
---@field latitude number
---@field longitude number
---@field name string
---@field numeric_code number
---@field phone_code string
---@field region string
---@field subregion string
---@field tld string

---@class CountryListMatch

---@class Currency
---@field name string
---@field symbol string

---@class CurrencyLoadMatch

---@class Geolocate
---@field capital string
---@field country_code string
---@field currency string
---@field emoji string
---@field ip any
---@field iso2 string
---@field iso3 string
---@field latitude number
---@field longitude number
---@field name string
---@field numeric_code number
---@field phone_code string
---@field region string
---@field subregion string
---@field tld string

---@class GeolocateLoadMatch

---@class Rate
---@field base string
---@field date string
---@field rate table

---@class RateLoadMatch

---@class ValidateIbanResponseSchema
---@field account_number string
---@field bank_code string
---@field bank_name string
---@field bban string
---@field bic string
---@field branch_code string
---@field checksum_digit string
---@field country_code string
---@field country_name string
---@field iban string
---@field in_sepa_zone boolean
---@field valid boolean

---@class ValidateIbanResponseSchemaLoadMatch

---@class ValidateVatResponseSchema
---@field address? string
---@field country_code string
---@field name? string
---@field valid boolean
---@field vat_number string

---@class ValidateVatResponseSchemaLoadMatch

---@class VatcomplyApiRoot
---@field contact string
---@field description string
---@field documentation string
---@field endpoint table
---@field name string
---@field status string
---@field version string

---@class VatcomplyApiRootLoadMatch

local M = {}

return M
