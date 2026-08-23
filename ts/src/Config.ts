
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'VatValidation',
        slug: "vat-validation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.vatcomply.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      country: {
      },

      currency: {
      },

      geolocate: {
      },

      rate: {
      },

      validate_iban_response_schema: {
      },

      validate_vat_response_schema: {
      },

      vatcomply_api_root: {
      },

    }
  }


  entity = {
    "country": {
      "fields": [
        {
          "name": "capital",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "currency",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "emoji",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "iso2",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "iso3",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "req": true,
          "type": "`$NUMBER`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 0
          }
        },
        {
          "name": "longitude",
          "req": true,
          "type": "`$NUMBER`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 0
          }
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "numeric_code",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "phone_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "subregion",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "tld",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/countries",
              "parts": [
                "countries"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "currency": {
      "fields": [
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "symbol",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "currency",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/currencies",
              "parts": [
                "currencies"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "geolocate": {
      "fields": [],
      "name": "geolocate",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/geolocate",
              "parts": [
                "geolocate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.ip`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rate": {
      "fields": [],
      "name": "rate",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "EUR",
                    "kind": "query",
                    "name": "base",
                    "orig": "base",
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/rates",
              "parts": [
                "rates"
              ],
              "select": {
                "exist": [
                  "base",
                  "date",
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "validate_iban_response_schema": {
      "fields": [
        {
          "name": "account_number",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "bank_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "bank_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "bban",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "bic",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "branch_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "checksum_digits",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "iban",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "in_sepa_zone",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "valid",
          "req": true,
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "validate_iban_response_schema",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "iban",
                    "orig": "iban",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/iban",
              "parts": [
                "iban"
              ],
              "select": {
                "exist": [
                  "iban"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "validate_vat_response_schema": {
      "fields": [],
      "name": "validate_vat_response_schema",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "vat_number",
                    "orig": "vat_number",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/vat",
              "parts": [
                "vat"
              ],
              "select": {
                "exist": [
                  "vat_number"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.name`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "vatcomply_api_root": {
      "fields": [],
      "name": "vatcomply_api_root",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.endpoints`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

