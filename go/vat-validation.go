package voxgigvatvalidationsdk

import (
	"github.com/voxgig-sdk/vat-validation-sdk/go/core"
	"github.com/voxgig-sdk/vat-validation-sdk/go/entity"
	"github.com/voxgig-sdk/vat-validation-sdk/go/feature"
	_ "github.com/voxgig-sdk/vat-validation-sdk/go/utility"
)

// Type aliases preserve external API.
type VatValidationSDK = core.VatValidationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type VatValidationEntity = core.VatValidationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type VatValidationError = core.VatValidationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCountryEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewCurrencyEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewGeolocateEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewGeolocateEntity(client, entopts)
	}
	core.NewRateEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewRateEntity(client, entopts)
	}
	core.NewValidateIbanResponseSchemaEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewValidateIbanResponseSchemaEntity(client, entopts)
	}
	core.NewValidateVatResponseSchemaEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewValidateVatResponseSchemaEntity(client, entopts)
	}
	core.NewVatcomplyApiRootEntityFunc = func(client *core.VatValidationSDK, entopts map[string]any) core.VatValidationEntity {
		return entity.NewVatcomplyApiRootEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewVatValidationSDK = core.NewVatValidationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewVatValidationSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *VatValidationSDK  { return NewVatValidationSDK(nil) }
func Test() *VatValidationSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
