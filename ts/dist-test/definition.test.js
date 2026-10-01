"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "country",
        "accessor": "Country",
        "op": "list",
        "method": "GET",
        "path": "/countries",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "iso2": "x",
                "iso3": "x",
                "name": "x",
                "numeric_code": 1,
                "phone_code": "x",
                "capital": "x",
                "currency": "x",
                "tld": "x",
                "region": "x",
                "subregion": "x",
                "latitude": 1,
                "longitude": 1,
                "emoji": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "currency",
        "accessor": "Currency",
        "op": "load",
        "method": "GET",
        "path": "/currencies",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "geolocate",
        "accessor": "Geolocate",
        "op": "load",
        "method": "GET",
        "path": "/geolocate",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "iso2": "x",
            "iso3": "x",
            "country_code": "x",
            "name": "x",
            "numeric_code": 1,
            "phone_code": "x",
            "capital": "x",
            "currency": "x",
            "tld": "x",
            "region": "x",
            "subregion": "x",
            "latitude": 1,
            "longitude": 1,
            "emoji": "x",
            "ip": "x"
        },
        "idField": "id"
    },
    {
        "entity": "rate",
        "accessor": "Rate",
        "op": "load",
        "method": "GET",
        "path": "/rates",
        "args": [],
        "select": {
            "base": "v1",
            "date": "v1",
            "symbol": "v1"
        },
        "headers": [],
        "query": [
            "base",
            "symbols",
            "date"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "date": "x",
            "base": "EUR",
            "rates": {}
        },
        "idField": "id"
    },
    {
        "entity": "validate_iban_response_schema",
        "accessor": "ValidateIbanResponseSchema",
        "op": "load",
        "method": "GET",
        "path": "/iban",
        "args": [],
        "select": {
            "iban": "v1"
        },
        "headers": [],
        "query": [
            "iban"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "valid": true,
            "iban": "x",
            "bank_name": "x",
            "bic": "x",
            "country_code": "x",
            "country_name": "x",
            "checksum_digits": "x",
            "bank_code": "x",
            "branch_code": "x",
            "account_number": "x",
            "bban": "x",
            "in_sepa_zone": true
        },
        "idField": "id"
    },
    {
        "entity": "validate_vat_response_schema",
        "accessor": "ValidateVatResponseSchema",
        "op": "load",
        "method": "GET",
        "path": "/vat",
        "args": [],
        "select": {
            "vat_number": "v1"
        },
        "headers": [],
        "query": [
            "vat_number"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "valid": true,
            "vat_number": "x",
            "name": "x",
            "address": "x",
            "country_code": "x"
        },
        "idField": "id"
    },
    {
        "entity": "vatcomply_api_root",
        "accessor": "VatcomplyApiRoot",
        "op": "load",
        "method": "GET",
        "path": "/",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "version": "x",
            "status": "x",
            "description": "x",
            "documentation": "x",
            "endpoints": {},
            "contact": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map