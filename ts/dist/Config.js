"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'VatValidation',
        slug: "vat-validation",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.vatcomply.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            country: {},
            currency: {},
            geolocate: {},
            rate: {},
            validate_iban_response_schema: {},
            validate_vat_response_schema: {},
            vatcomply_api_root: {},
        }
    };
    entity = {
        "country": {
            "fields": [
                {
                    "name": "capital",
                    "title": "Capital",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "emoji",
                    "title": "Emoji",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "iso2",
                    "title": "Iso2",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "iso3",
                    "title": "Iso3",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "numeric_code",
                    "title": "Numeric Code",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "phone_code",
                    "title": "Phone Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "region",
                    "title": "Region",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "subregion",
                    "title": "Subregion",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tld",
                    "title": "Tld",
                    "type": "`$STRING`",
                    "req": true
                }
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
                                    "lit": "countries"
                                }
                            ],
                            "parts": [
                                "countries"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "symbol",
                    "title": "Symbol",
                    "type": "`$STRING`",
                    "req": true
                }
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
                                    "lit": "currencies"
                                }
                            ],
                            "parts": [
                                "currencies"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
            "fields": [
                {
                    "name": "capital",
                    "title": "Capital",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "currency",
                    "title": "Currency",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "emoji",
                    "title": "Emoji",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "iso2",
                    "title": "Iso2",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "iso3",
                    "title": "Iso3",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "numeric_code",
                    "title": "Numeric Code",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "phone_code",
                    "title": "Phone Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "region",
                    "title": "Region",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "subregion",
                    "title": "Subregion",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "tld",
                    "title": "Tld",
                    "type": "`$STRING`",
                    "req": true
                }
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
                                    "lit": "geolocate"
                                }
                            ],
                            "parts": [
                                "geolocate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
            "fields": [
                {
                    "name": "base",
                    "title": "Base",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "date",
                    "title": "Date",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "rates",
                    "title": "Rates",
                    "type": "`$OBJECT`",
                    "req": true
                }
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
                                    "lit": "rates"
                                }
                            ],
                            "parts": [
                                "rates"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "base",
                                        "orig": "base",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "example": "EUR",
                                        "field": true
                                    },
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$ANY`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "symbol",
                                        "orig": "symbols",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
                    "title": "Account Number",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "bank_code",
                    "title": "Bank Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "bank_name",
                    "title": "Bank Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "bban",
                    "title": "Bban",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "bic",
                    "title": "Bic",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "branch_code",
                    "title": "Branch Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "checksum_digits",
                    "title": "Checksum Digits",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "country_name",
                    "title": "Country Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "iban",
                    "title": "Iban",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "in_sepa_zone",
                    "title": "In Sepa Zone",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "valid",
                    "title": "Valid",
                    "type": "`$BOOLEAN`",
                    "req": true
                }
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
                                    "lit": "iban"
                                }
                            ],
                            "parts": [
                                "iban"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "iban",
                                        "orig": "iban",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "iban"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
            "fields": [
                {
                    "name": "address",
                    "title": "Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "valid",
                    "title": "Valid",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "vat_number",
                    "title": "Vat Number",
                    "type": "`$STRING`",
                    "req": true
                }
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
                                    "lit": "vat"
                                }
                            ],
                            "parts": [
                                "vat"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "vat_number",
                                        "orig": "vat_number",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "vat_number"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
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
            "fields": [
                {
                    "name": "contact",
                    "title": "Contact",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "documentation",
                    "title": "Documentation",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "endpoints",
                    "title": "Endpoints",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$STRING`",
                    "req": true
                }
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
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map