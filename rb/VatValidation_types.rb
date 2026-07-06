# frozen_string_literal: true

# Typed models for the VatValidation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Country entity data model.
#
# @!attribute [rw] capital
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] emoji
#   @return [String]
#
# @!attribute [rw] iso2
#   @return [String]
#
# @!attribute [rw] iso3
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] numeric_code
#   @return [Integer]
#
# @!attribute [rw] phone_code
#   @return [String]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] subregion
#   @return [String]
#
# @!attribute [rw] tld
#   @return [String]
Country = Struct.new(
  :capital,
  :currency,
  :emoji,
  :iso2,
  :iso3,
  :latitude,
  :longitude,
  :name,
  :numeric_code,
  :phone_code,
  :region,
  :subregion,
  :tld,
  keyword_init: true
)

# Request payload for Country#list.
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] emoji
#   @return [String, nil]
#
# @!attribute [rw] iso2
#   @return [String, nil]
#
# @!attribute [rw] iso3
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] numeric_code
#   @return [Integer, nil]
#
# @!attribute [rw] phone_code
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] subregion
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
CountryListMatch = Struct.new(
  :capital,
  :currency,
  :emoji,
  :iso2,
  :iso3,
  :latitude,
  :longitude,
  :name,
  :numeric_code,
  :phone_code,
  :region,
  :subregion,
  :tld,
  keyword_init: true
)

# Currency entity data model.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] symbol
#   @return [String]
Currency = Struct.new(
  :name,
  :symbol,
  keyword_init: true
)

# Request payload for Currency#load.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
CurrencyLoadMatch = Struct.new(
  :name,
  :symbol,
  keyword_init: true
)

# Geolocate entity data model.
#
# @!attribute [rw] capital
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] emoji
#   @return [String]
#
# @!attribute [rw] ip
#   @return [Object]
#
# @!attribute [rw] iso2
#   @return [String]
#
# @!attribute [rw] iso3
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] numeric_code
#   @return [Integer]
#
# @!attribute [rw] phone_code
#   @return [String]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] subregion
#   @return [String]
#
# @!attribute [rw] tld
#   @return [String]
Geolocate = Struct.new(
  :capital,
  :country_code,
  :currency,
  :emoji,
  :ip,
  :iso2,
  :iso3,
  :latitude,
  :longitude,
  :name,
  :numeric_code,
  :phone_code,
  :region,
  :subregion,
  :tld,
  keyword_init: true
)

# Request payload for Geolocate#load.
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] emoji
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [Object, nil]
#
# @!attribute [rw] iso2
#   @return [String, nil]
#
# @!attribute [rw] iso3
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] numeric_code
#   @return [Integer, nil]
#
# @!attribute [rw] phone_code
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] subregion
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
GeolocateLoadMatch = Struct.new(
  :capital,
  :country_code,
  :currency,
  :emoji,
  :ip,
  :iso2,
  :iso3,
  :latitude,
  :longitude,
  :name,
  :numeric_code,
  :phone_code,
  :region,
  :subregion,
  :tld,
  keyword_init: true
)

# Rate entity data model.
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] rate
#   @return [Hash]
Rate = Struct.new(
  :base,
  :date,
  :rate,
  keyword_init: true
)

# Request payload for Rate#load.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Hash, nil]
RateLoadMatch = Struct.new(
  :base,
  :date,
  :rate,
  keyword_init: true
)

# ValidateIbanResponseSchema entity data model.
#
# @!attribute [rw] account_number
#   @return [String]
#
# @!attribute [rw] bank_code
#   @return [String]
#
# @!attribute [rw] bank_name
#   @return [String]
#
# @!attribute [rw] bban
#   @return [String]
#
# @!attribute [rw] bic
#   @return [String]
#
# @!attribute [rw] branch_code
#   @return [String]
#
# @!attribute [rw] checksum_digit
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] country_name
#   @return [String]
#
# @!attribute [rw] iban
#   @return [String]
#
# @!attribute [rw] in_sepa_zone
#   @return [Boolean]
#
# @!attribute [rw] valid
#   @return [Boolean]
ValidateIbanResponseSchema = Struct.new(
  :account_number,
  :bank_code,
  :bank_name,
  :bban,
  :bic,
  :branch_code,
  :checksum_digit,
  :country_code,
  :country_name,
  :iban,
  :in_sepa_zone,
  :valid,
  keyword_init: true
)

# Request payload for ValidateIbanResponseSchema#load.
#
# @!attribute [rw] account_number
#   @return [String, nil]
#
# @!attribute [rw] bank_code
#   @return [String, nil]
#
# @!attribute [rw] bank_name
#   @return [String, nil]
#
# @!attribute [rw] bban
#   @return [String, nil]
#
# @!attribute [rw] bic
#   @return [String, nil]
#
# @!attribute [rw] branch_code
#   @return [String, nil]
#
# @!attribute [rw] checksum_digit
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] iban
#   @return [String, nil]
#
# @!attribute [rw] in_sepa_zone
#   @return [Boolean, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
ValidateIbanResponseSchemaLoadMatch = Struct.new(
  :account_number,
  :bank_code,
  :bank_name,
  :bban,
  :bic,
  :branch_code,
  :checksum_digit,
  :country_code,
  :country_name,
  :iban,
  :in_sepa_zone,
  :valid,
  keyword_init: true
)

# ValidateVatResponseSchema entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean]
#
# @!attribute [rw] vat_number
#   @return [String]
ValidateVatResponseSchema = Struct.new(
  :address,
  :country_code,
  :name,
  :valid,
  :vat_number,
  keyword_init: true
)

# Request payload for ValidateVatResponseSchema#load.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
#
# @!attribute [rw] vat_number
#   @return [String, nil]
ValidateVatResponseSchemaLoadMatch = Struct.new(
  :address,
  :country_code,
  :name,
  :valid,
  :vat_number,
  keyword_init: true
)

# VatcomplyApiRoot entity data model.
#
# @!attribute [rw] contact
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] documentation
#   @return [String]
#
# @!attribute [rw] endpoint
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
VatcomplyApiRoot = Struct.new(
  :contact,
  :description,
  :documentation,
  :endpoint,
  :name,
  :status,
  :version,
  keyword_init: true
)

# Request payload for VatcomplyApiRoot#load.
#
# @!attribute [rw] contact
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] endpoint
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
VatcomplyApiRootLoadMatch = Struct.new(
  :contact,
  :description,
  :documentation,
  :endpoint,
  :name,
  :status,
  :version,
  keyword_init: true
)

