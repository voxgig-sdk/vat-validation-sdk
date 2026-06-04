# VatValidation SDK configuration


def make_config():
    return {
        "main": {
            "name": "VatValidation",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.vatcomply.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "country": {},
                "currency": {},
                "geolocate": {},
                "rate": {},
                "validate_iban_response_schema": {},
                "validate_vat_response_schema": {},
                "vatcomply_api_root": {},
            },
        },
        "entity": {
      "country": {
        "fields": [
          {
            "name": "capital",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "currency",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "emoji",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "iso2",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "iso3",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "numeric_code",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "phone_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "subregion",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "tld",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
        ],
        "name": "country",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/countries",
                "parts": [
                  "countries",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "currency": {
        "fields": [
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "symbol",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "currency",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/currencies",
                "parts": [
                  "currencies",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "geolocate": {
        "fields": [
          {
            "name": "capital",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "currency",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "emoji",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$ANY`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "iso2",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "iso3",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "numeric_code",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "phone_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "subregion",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "tld",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 14,
          },
        ],
        "name": "geolocate",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/geolocate",
                "parts": [
                  "geolocate",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "rate": {
        "fields": [
          {
            "name": "base",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "date",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "rate",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "rate",
        "op": {
          "load": {
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
                      "reqd": False,
                      "type": "`$ANY`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": False,
                      "type": "`$ANY`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "symbol",
                      "orig": "symbol",
                      "reqd": False,
                      "type": "`$ANY`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/rates",
                "parts": [
                  "rates",
                ],
                "select": {
                  "exist": [
                    "base",
                    "date",
                    "symbol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "validate_iban_response_schema": {
        "fields": [
          {
            "name": "account_number",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "bank_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "bank_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "bban",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "bic",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "branch_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "checksum_digit",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "iban",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "in_sepa_zone",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 11,
          },
        ],
        "name": "validate_iban_response_schema",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "iban",
                      "orig": "iban",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/iban",
                "parts": [
                  "iban",
                ],
                "select": {
                  "exist": [
                    "iban",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "validate_vat_response_schema": {
        "fields": [
          {
            "name": "address",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "vat_number",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "validate_vat_response_schema",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "vat_number",
                      "orig": "vat_number",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/vat",
                "parts": [
                  "vat",
                ],
                "select": {
                  "exist": [
                    "vat_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vatcomply_api_root": {
        "fields": [
          {
            "name": "contact",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "description",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "documentation",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "endpoint",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "version",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "vatcomply_api_root",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/",
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "parts": [],
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
