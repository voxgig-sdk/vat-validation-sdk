# VatValidation SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Capital",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "emoji",
            "title": "Emoji",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "iso2",
            "title": "Iso2",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "iso3",
            "title": "Iso3",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "numeric_code",
            "title": "Numeric Code",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "phone_code",
            "title": "Phone Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subregion",
            "title": "Subregion",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tld",
            "title": "Tld",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "country",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/countries",
                "segments": [
                  {
                    "lit": "countries",
                  },
                ],
                "parts": [
                  "countries",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "symbol",
            "title": "Symbol",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "currency",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/currencies",
                "segments": [
                  {
                    "lit": "currencies",
                  },
                ],
                "parts": [
                  "currencies",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
            "title": "Capital",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "emoji",
            "title": "Emoji",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "iso2",
            "title": "Iso2",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "iso3",
            "title": "Iso3",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "numeric_code",
            "title": "Numeric Code",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "phone_code",
            "title": "Phone Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subregion",
            "title": "Subregion",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "tld",
            "title": "Tld",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "geolocate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/geolocate",
                "segments": [
                  {
                    "lit": "geolocate",
                  },
                ],
                "parts": [
                  "geolocate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
            "title": "Base",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "rate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/rates",
                "segments": [
                  {
                    "lit": "rates",
                  },
                ],
                "parts": [
                  "rates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "base",
                      "orig": "base",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "EUR",
                    },
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "symbol",
                      "orig": "symbols",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "base",
                    "date",
                    "symbol",
                  ],
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
            "title": "Account Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bank_code",
            "title": "Bank Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bank_name",
            "title": "Bank Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bban",
            "title": "Bban",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "bic",
            "title": "Bic",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "branch_code",
            "title": "Branch Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "checksum_digits",
            "title": "Checksum Digits",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "country_name",
            "title": "Country Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "iban",
            "title": "Iban",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "in_sepa_zone",
            "title": "In Sepa Zone",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "name": "validate_iban_response_schema",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/iban",
                "segments": [
                  {
                    "lit": "iban",
                  },
                ],
                "parts": [
                  "iban",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "iban",
                      "orig": "iban",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "iban",
                  ],
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
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "vat_number",
            "title": "Vat Number",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "validate_vat_response_schema",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/vat",
                "segments": [
                  {
                    "lit": "vat",
                  },
                ],
                "parts": [
                  "vat",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "vat_number",
                      "orig": "vat_number",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "vat_number",
                  ],
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
        "fields": [
          {
            "name": "contact",
            "title": "Contact",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "documentation",
            "title": "Documentation",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "endpoints",
            "title": "Endpoints",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "vatcomply_api_root",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "segments": [],
                "parts": [],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
