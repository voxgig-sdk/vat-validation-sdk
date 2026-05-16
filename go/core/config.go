package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "VatValidation",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.vatcomply.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "currency",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "emoji",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "iso2",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "iso3",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "numeric_code",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "phone_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "subregion",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 12,
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/countries",
								"parts": []any{
									"countries",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "symbol",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "currency",
				"op": map[string]any{
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/currencies",
								"parts": []any{
									"currencies",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "currency",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "emoji",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "iso2",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "iso3",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "numeric_code",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "phone_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 12,
					},
					map[string]any{
						"name": "subregion",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 13,
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 14,
					},
				},
				"name": "geolocate",
				"op": map[string]any{
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/geolocate",
								"parts": []any{
									"geolocate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "date",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "rate",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
				},
				"name": "rate",
				"op": map[string]any{
					"load": map[string]any{
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
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "bank_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "bank_name",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "bban",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "bic",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "branch_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "checksum_digit",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "iban",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "in_sepa_zone",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "valid",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 11,
					},
				},
				"name": "validate_iban_response_schema",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "valid",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "vat_number",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "validate_vat_response_schema",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "description",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "documentation",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "endpoint",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "version",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
				},
				"name": "vatcomply_api_root",
				"op": map[string]any{
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/",
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"parts": []any{},
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
