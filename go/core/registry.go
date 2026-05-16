package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCountryEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewCurrencyEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewGeolocateEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewRateEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewValidateIbanResponseSchemaEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewValidateVatResponseSchemaEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

var NewVatcomplyApiRootEntityFunc func(client *VatValidationSDK, entopts map[string]any) VatValidationEntity

