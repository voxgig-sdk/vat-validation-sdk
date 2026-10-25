package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "VatValidation",
			"slug": "vat-validation",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.vatcomply.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"country": map[string]any{},
				"currency": map[string]any{},
				"geolocate": map[string]any{},
				"rate": map[string]any{},
				"validate_iban_response_schema": map[string]any{},
				"validate_vat_response_schema": map[string]any{},
				"vatcomply_api_root": map[string]any{},
			},
		},
		"entity": map[string]any{
			"country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capital",
						"title": "Capital",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "emoji",
						"title": "Emoji",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "iso2",
						"title": "Iso2",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "iso3",
						"title": "Iso3",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "numeric_code",
						"title": "Numeric Code",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "phone_code",
						"title": "Phone Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subregion",
						"title": "Subregion",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tld",
						"title": "Tld",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
								},
								"parts": []any{
									"countries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"currency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "symbol",
						"title": "Symbol",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "currency",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/currencies",
								"segments": []any{
									map[string]any{
										"lit": "currencies",
									},
								},
								"parts": []any{
									"currencies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"geolocate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capital",
						"title": "Capital",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "emoji",
						"title": "Emoji",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "iso2",
						"title": "Iso2",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "iso3",
						"title": "Iso3",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "numeric_code",
						"title": "Numeric Code",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "phone_code",
						"title": "Phone Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subregion",
						"title": "Subregion",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tld",
						"title": "Tld",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "geolocate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/geolocate",
								"segments": []any{
									map[string]any{
										"lit": "geolocate",
									},
								},
								"parts": []any{
									"geolocate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"title": "Base",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rates",
								"segments": []any{
									map[string]any{
										"lit": "rates",
									},
								},
								"parts": []any{
									"rates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "base",
											"orig": "base",
											"type": "`$ANY`",
											"kind": "query",
											"example": "EUR",
											"field": true,
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$ANY`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbols",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"validate_iban_response_schema": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_number",
						"title": "Account Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bank_code",
						"title": "Bank Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bank_name",
						"title": "Bank Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bban",
						"title": "Bban",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "bic",
						"title": "Bic",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "branch_code",
						"title": "Branch Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "checksum_digits",
						"title": "Checksum Digits",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "country_name",
						"title": "Country Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "iban",
						"title": "Iban",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "in_sepa_zone",
						"title": "In Sepa Zone",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "validate_iban_response_schema",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/iban",
								"segments": []any{
									map[string]any{
										"lit": "iban",
									},
								},
								"parts": []any{
									"iban",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "iban",
											"orig": "iban",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"iban",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"validate_vat_response_schema": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "vat_number",
						"title": "Vat Number",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "validate_vat_response_schema",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vat",
								"segments": []any{
									map[string]any{
										"lit": "vat",
									},
								},
								"parts": []any{
									"vat",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "vat_number",
											"orig": "vat_number",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"vat_number",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vatcomply_api_root": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contact",
						"title": "Contact",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "documentation",
						"title": "Documentation",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "endpoints",
						"title": "Endpoints",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "vatcomply_api_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
