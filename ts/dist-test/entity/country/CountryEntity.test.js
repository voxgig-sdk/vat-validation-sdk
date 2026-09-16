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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "capital", "req": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "currency", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "emoji", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "iso2", "req": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "iso3", "req": true, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "latitude", "req": true, "type": "`$NUMBER`", "union": { "branches": 2, "count": 1, "depth": 0 }, "index$": 5 }, { "active": true, "name": "longitude", "req": true, "type": "`$NUMBER`", "union": { "branches": 2, "count": 1, "depth": 0 }, "index$": 6 }, { "active": true, "name": "name", "req": true, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "numeric_code", "req": true, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "phone_code", "req": true, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "region", "req": true, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "subregion", "req": true, "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "tld", "req": true, "type": "`$STRING`", "index$": 12 }], "name": "country", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /countries", "json": "{\"operationId\":\"vatcomply_api_countries\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"capital\":{\"title\":\"Capital\",\"type\":\"string\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"emoji\":{\"title\":\"Emoji\",\"type\":\"string\"},\"iso2\":{\"title\":\"Iso2\",\"type\":\"string\"},\"iso3\":{\"title\":\"Iso3\",\"type\":\"string\"},\"latitude\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"}],\"title\":\"Latitude\"},\"longitude\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"}],\"title\":\"Longitude\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"},\"numeric_code\":{\"title\":\"Numeric Code\",\"type\":\"integer\"},\"phone_code\":{\"title\":\"Phone Code\",\"type\":\"string\"},\"region\":{\"title\":\"Region\",\"type\":\"string\"},\"subregion\":{\"title\":\"Subregion\",\"type\":\"string\"},\"tld\":{\"title\":\"Tld\",\"type\":\"string\"}},\"required\":[\"iso2\",\"iso3\",\"name\",\"numeric_code\",\"phone_code\",\"capital\",\"currency\",\"tld\",\"region\",\"subregion\",\"latitude\",\"longitude\",\"emoji\"],\"title\":\"CountrySchema\",\"type\":\"object\"},\"title\":\"Response\",\"type\":\"array\"}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/countries", "segments": [{ "lit": "countries" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "country", "name__orig": "country", "Name": "Country", "name_": "country", "name-": "country", "NAME": "COUNTRY", "index$": 0 }, { "active": true, "entity": "country", "key$": "BasicCountryFlow", "kind": "basic", "name": "BasicCountryFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "country_ref01" } }], "index$": 0 }] }, 'Country');
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