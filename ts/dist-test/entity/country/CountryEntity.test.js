"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CountryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VAT_VALIDATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VatValidationSDK.test();
        const ent = testsdk.Country();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'country.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "capital": { "a": true, "h": "Capital", "n": "capital", "r": true, "t": "`$STRING`", "key$": "capital", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 1 }, "emoji": { "a": true, "h": "Emoji", "n": "emoji", "r": true, "t": "`$STRING`", "key$": "emoji", "index$": 2 }, "iso2": { "a": true, "h": "Iso2", "n": "iso2", "r": true, "t": "`$STRING`", "key$": "iso2", "index$": 3 }, "iso3": { "a": true, "h": "Iso3", "n": "iso3", "r": true, "t": "`$STRING`", "key$": "iso3", "index$": 4 }, "latitude": { "a": true, "h": "Latitude", "n": "latitude", "r": true, "t": "`$NUMBER`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "latitude", "index$": 5 }, "longitude": { "a": true, "h": "Longitude", "n": "longitude", "r": true, "t": "`$NUMBER`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "longitude", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 7 }, "numeric_code": { "a": true, "h": "Numeric Code", "n": "numeric_code", "r": true, "t": "`$INTEGER`", "key$": "numeric_code", "index$": 8 }, "phone_code": { "a": true, "h": "Phone Code", "n": "phone_code", "r": true, "t": "`$STRING`", "key$": "phone_code", "index$": 9 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": "`$STRING`", "key$": "region", "index$": 10 }, "subregion": { "a": true, "h": "Subregion", "n": "subregion", "r": true, "t": "`$STRING`", "key$": "subregion", "index$": 11 }, "tld": { "a": true, "h": "Tld", "n": "tld", "r": true, "t": "`$STRING`", "key$": "tld", "index$": 12 } }, "name": "country", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /countries", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/countries", "q": {}, "r": {}, "s": [{ "lit": "countries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "country", "name__orig": "country", "Name": "Country", "name_": "country", "name-": "country", "NAME": "COUNTRY", "index$": 0 }, { "active": true, "entity": "country", "key$": "BasicCountryFlow", "kind": "basic", "name": "BasicCountryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "country_ref01" } }], "index$": 0 }] }, 'Country', { "GET /countries": { "protocol": "http", "operationId": "vatcomply_api_countries", "responses": { "200": { "description": "OK", "content": { "application/json": { "schema": { "items": { "properties": { "iso2": { "title": "Iso2", "type": "string", "key$": "iso2" }, "iso3": { "title": "Iso3", "type": "string", "key$": "iso3" }, "name": { "title": "Name", "type": "string", "key$": "name" }, "numeric_code": { "title": "Numeric Code", "type": "integer", "key$": "numeric_code" }, "phone_code": { "title": "Phone Code", "type": "string", "key$": "phone_code" }, "capital": { "title": "Capital", "type": "string", "key$": "capital" }, "currency": { "title": "Currency", "type": "string", "key$": "currency" }, "tld": { "title": "Tld", "type": "string", "key$": "tld" }, "region": { "title": "Region", "type": "string", "key$": "region" }, "subregion": { "title": "Subregion", "type": "string", "key$": "subregion" }, "latitude": { "anyOf": [{ "type": "number" }, { "type": "string" }], "title": "Latitude", "key$": "latitude" }, "longitude": { "anyOf": [{ "type": "number" }, { "type": "string" }], "title": "Longitude", "key$": "longitude" }, "emoji": { "title": "Emoji", "type": "string", "key$": "emoji" } }, "required": ["iso2", "iso3", "name", "numeric_code", "phone_code", "capital", "currency", "tld", "region", "subregion", "latitude", "longitude", "emoji"], "title": "CountrySchema", "type": "object", "x-ref": "#/components/schemas/CountrySchema", "index$": 0 }, "title": "Response", "type": "array" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let country_ref01_data = Object.values(setup.data.existing.country)[0];
        // LIST
        const country_ref01_ent = client.Country();
        const country_ref01_match = {};
        const country_ref01_list = (await country_ref01_ent.list(country_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/country/CountryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VatValidationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['country01', 'country02', 'country03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VAT_VALIDATION_TEST_COUNTRY_ENTID': idmap,
        'VAT_VALIDATION_TEST_LIVE': 'FALSE',
        'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VAT_VALIDATION_TEST_COUNTRY_ENTID'];
    const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VAT_VALIDATION_TEST_COUNTRY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.VatValidationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.VAT_VALIDATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CountryEntity.test.js.map