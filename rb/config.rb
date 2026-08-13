# VatValidation SDK configuration

module VatValidationConfig
  def self.make_config
    {
      "main" => {
        "name" => "VatValidation",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.vatcomply.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "country" => {},
          "currency" => {},
          "geolocate" => {},
          "rate" => {},
          "validate_iban_response_schema" => {},
          "validate_vat_response_schema" => {},
          "vatcomply_api_root" => {},
        },
      },
      "entity" => {
        "country" => {
          "fields" => [
            {
              "active" => true,
              "name" => "capital",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "currency",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "emoji",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "iso2",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "iso3",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "latitude",
              "req" => true,
              "type" => "`$NUMBER`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "longitude",
              "req" => true,
              "type" => "`$NUMBER`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "numeric_code",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "phone_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "region",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "subregion",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "tld",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 12,
            },
          ],
          "name" => "country",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/countries",
                  "parts" => [
                    "countries",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "currency" => {
          "fields" => [
            {
              "active" => true,
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "symbol",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "currency",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/currencies",
                  "parts" => [
                    "currencies",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "geolocate" => {
          "fields" => [],
          "name" => "geolocate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/geolocate",
                  "parts" => [
                    "geolocate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.ip`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "rate" => {
          "fields" => [],
          "name" => "rate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "EUR",
                        "kind" => "query",
                        "name" => "base",
                        "orig" => "base",
                        "reqd" => false,
                        "type" => "`$ANY`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => false,
                        "type" => "`$ANY`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => false,
                        "type" => "`$ANY`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/rates",
                  "parts" => [
                    "rates",
                  ],
                  "select" => {
                    "exist" => [
                      "base",
                      "date",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "validate_iban_response_schema" => {
          "fields" => [
            {
              "active" => true,
              "name" => "account_number",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "bank_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "bank_name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "bban",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "bic",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "branch_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "checksum_digits",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "country_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "country_name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "iban",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "in_sepa_zone",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "valid",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 11,
            },
          ],
          "name" => "validate_iban_response_schema",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "iban",
                        "orig" => "iban",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/iban",
                  "parts" => [
                    "iban",
                  ],
                  "select" => {
                    "exist" => [
                      "iban",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "validate_vat_response_schema" => {
          "fields" => [],
          "name" => "validate_vat_response_schema",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "vat_number",
                        "orig" => "vat_number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/vat",
                  "parts" => [
                    "vat",
                  ],
                  "select" => {
                    "exist" => [
                      "vat_number",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.name`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "vatcomply_api_root" => {
          "fields" => [],
          "name" => "vatcomply_api_root",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.endpoints`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    VatValidationFeatures.make_feature(name)
  end
end
