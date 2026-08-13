// Typed models for the VatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/vat-validation-sdk/go/core"
)

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
}

// GeolocateLoadMatch is the typed request payload for Geolocate.LoadTyped.
type GeolocateLoadMatch struct {
}

// Rate is the typed data model for the rate entity.
type Rate struct {
}

// RateLoadMatch is the typed request payload for Rate.LoadTyped.
type RateLoadMatch struct {
}

// ValidateIbanResponseSchema is the typed data model for the validate_iban_response_schema entity.
type ValidateIbanResponseSchema struct {
	AccountNumber string `json:"account_number"`
	BankCode string `json:"bank_code"`
	BankName string `json:"bank_name"`
	Bban string `json:"bban"`
	Bic string `json:"bic"`
	BranchCode string `json:"branch_code"`
	ChecksumDigits string `json:"checksum_digits"`
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
	ChecksumDigits *string `json:"checksum_digits,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Iban *string `json:"iban,omitempty"`
	InSepaZone *bool `json:"in_sepa_zone,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// ValidateVatResponseSchema is the typed data model for the validate_vat_response_schema entity.
type ValidateVatResponseSchema struct {
}

// ValidateVatResponseSchemaLoadMatch is the typed request payload for ValidateVatResponseSchema.LoadTyped.
type ValidateVatResponseSchemaLoadMatch struct {
}

// VatcomplyApiRoot is the typed data model for the vatcomply_api_root entity.
type VatcomplyApiRoot struct {
}

// VatcomplyApiRootLoadMatch is the typed request payload for VatcomplyApiRoot.LoadTyped.
type VatcomplyApiRootLoadMatch struct {
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
