// Typed models for the VatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Country is the typed data model for the country entity.
type Country struct {
	Capital string `json:"capital"`
	Currency string `json:"currency"`
	Emoji string `json:"emoji"`
	Iso2 string `json:"iso2"`
	Iso3 string `json:"iso3"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Name string `json:"name"`
	NumericCode int `json:"numeric_code"`
	PhoneCode string `json:"phone_code"`
	Region string `json:"region"`
	Subregion string `json:"subregion"`
	Tld string `json:"tld"`
}

// CountryListMatch is the typed request payload for Country.ListTyped.
type CountryListMatch struct {
	Capital *string `json:"capital,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Emoji *string `json:"emoji,omitempty"`
	Iso2 *string `json:"iso2,omitempty"`
	Iso3 *string `json:"iso3,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	NumericCode *int `json:"numeric_code,omitempty"`
	PhoneCode *string `json:"phone_code,omitempty"`
	Region *string `json:"region,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tld *string `json:"tld,omitempty"`
}

// Currency is the typed data model for the currency entity.
type Currency struct {
	Name string `json:"name"`
	Symbol string `json:"symbol"`
}

// CurrencyLoadMatch is the typed request payload for Currency.LoadTyped.
type CurrencyLoadMatch struct {
	Name *string `json:"name,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
}

// Geolocate is the typed data model for the geolocate entity.
type Geolocate struct {
	Capital string `json:"capital"`
	CountryCode string `json:"country_code"`
	Currency string `json:"currency"`
	Emoji string `json:"emoji"`
	Ip any `json:"ip"`
	Iso2 string `json:"iso2"`
	Iso3 string `json:"iso3"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Name string `json:"name"`
	NumericCode int `json:"numeric_code"`
	PhoneCode string `json:"phone_code"`
	Region string `json:"region"`
	Subregion string `json:"subregion"`
	Tld string `json:"tld"`
}

// GeolocateLoadMatch is the typed request payload for Geolocate.LoadTyped.
type GeolocateLoadMatch struct {
	Capital *string `json:"capital,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Emoji *string `json:"emoji,omitempty"`
	Ip *any `json:"ip,omitempty"`
	Iso2 *string `json:"iso2,omitempty"`
	Iso3 *string `json:"iso3,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	NumericCode *int `json:"numeric_code,omitempty"`
	PhoneCode *string `json:"phone_code,omitempty"`
	Region *string `json:"region,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tld *string `json:"tld,omitempty"`
}

// Rate is the typed data model for the rate entity.
type Rate struct {
	Base string `json:"base"`
	Date string `json:"date"`
	Rate map[string]any `json:"rate"`
}

// RateLoadMatch is the typed request payload for Rate.LoadTyped.
type RateLoadMatch struct {
	Base *string `json:"base,omitempty"`
	Date *string `json:"date,omitempty"`
	Rate *map[string]any `json:"rate,omitempty"`
}

// ValidateIbanResponseSchema is the typed data model for the validate_iban_response_schema entity.
type ValidateIbanResponseSchema struct {
	AccountNumber string `json:"account_number"`
	BankCode string `json:"bank_code"`
	BankName string `json:"bank_name"`
	Bban string `json:"bban"`
	Bic string `json:"bic"`
	BranchCode string `json:"branch_code"`
	ChecksumDigit string `json:"checksum_digit"`
	CountryCode string `json:"country_code"`
	CountryName string `json:"country_name"`
	Iban string `json:"iban"`
	InSepaZone bool `json:"in_sepa_zone"`
	Valid bool `json:"valid"`
}

// ValidateIbanResponseSchemaLoadMatch is the typed request payload for ValidateIbanResponseSchema.LoadTyped.
type ValidateIbanResponseSchemaLoadMatch struct {
	AccountNumber *string `json:"account_number,omitempty"`
	BankCode *string `json:"bank_code,omitempty"`
	BankName *string `json:"bank_name,omitempty"`
	Bban *string `json:"bban,omitempty"`
	Bic *string `json:"bic,omitempty"`
	BranchCode *string `json:"branch_code,omitempty"`
	ChecksumDigit *string `json:"checksum_digit,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Iban *string `json:"iban,omitempty"`
	InSepaZone *bool `json:"in_sepa_zone,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// ValidateVatResponseSchema is the typed data model for the validate_vat_response_schema entity.
type ValidateVatResponseSchema struct {
	Address *string `json:"address,omitempty"`
	CountryCode string `json:"country_code"`
	Name *string `json:"name,omitempty"`
	Valid bool `json:"valid"`
	VatNumber string `json:"vat_number"`
}

// ValidateVatResponseSchemaLoadMatch is the typed request payload for ValidateVatResponseSchema.LoadTyped.
type ValidateVatResponseSchemaLoadMatch struct {
	Address *string `json:"address,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Name *string `json:"name,omitempty"`
	Valid *bool `json:"valid,omitempty"`
	VatNumber *string `json:"vat_number,omitempty"`
}

// VatcomplyApiRoot is the typed data model for the vatcomply_api_root entity.
type VatcomplyApiRoot struct {
	Contact string `json:"contact"`
	Description string `json:"description"`
	Documentation string `json:"documentation"`
	Endpoint map[string]any `json:"endpoint"`
	Name string `json:"name"`
	Status string `json:"status"`
	Version string `json:"version"`
}

// VatcomplyApiRootLoadMatch is the typed request payload for VatcomplyApiRoot.LoadTyped.
type VatcomplyApiRootLoadMatch struct {
	Contact *string `json:"contact,omitempty"`
	Description *string `json:"description,omitempty"`
	Documentation *string `json:"documentation,omitempty"`
	Endpoint *map[string]any `json:"endpoint,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
	Version *string `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
