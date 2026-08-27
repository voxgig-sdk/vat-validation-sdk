# VatValidation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "VatValidation",
            "slug": "vat-validation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
          },
          {
            "name": "currency",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "emoji",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "iso2",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "iso3",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "numeric_code",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "phone_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "subregion",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tld",
            "req": True,
            "type": "`$STRING`",
          },
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
                  "countries",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
          },
          {
            "name": "symbol",
            "req": True,
            "type": "`$STRING`",
          },
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
                  "currencies",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                  "geolocate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.ip`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.rates`",
                },
              },
            ],
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
          },
          {
            "name": "bank_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "bank_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "bban",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "bic",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "branch_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "checksum_digits",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "iban",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "in_sepa_zone",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.name`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                  "res": "`body.endpoints`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
