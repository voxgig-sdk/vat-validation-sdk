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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "emoji",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iso2",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iso3",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numeric_code",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "phone_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subregion",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"parts": []any{
									"countries",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "symbol",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "currency",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/currencies",
								"parts": []any{
									"currencies",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
				"fields": []any{},
				"name": "geolocate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/geolocate",
								"parts": []any{
									"geolocate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ip`",
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
				"fields": []any{},
				"name": "rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "EUR",
											"kind": "query",
											"name": "base",
											"orig": "base",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/rates",
								"parts": []any{
									"rates",
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"date",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
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
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bank_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bank_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bban",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bic",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "branch_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "checksum_digits",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iban",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "in_sepa_zone",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "valid",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "validate_iban_response_schema",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "iban",
											"orig": "iban",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/iban",
								"parts": []any{
									"iban",
								},
								"select": map[string]any{
									"exist": []any{
										"iban",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
				"fields": []any{},
				"name": "validate_vat_response_schema",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "vat_number",
											"orig": "vat_number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vat",
								"parts": []any{
									"vat",
								},
								"select": map[string]any{
									"exist": []any{
										"vat_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.name`",
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
				"fields": []any{},
				"name": "vatcomply_api_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.endpoints`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
