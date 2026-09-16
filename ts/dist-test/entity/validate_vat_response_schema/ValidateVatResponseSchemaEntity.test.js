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
(0, node_test_1.describe)('ValidateVatResponseSchemaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VAT_VALIDATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VatValidationSDK.test();
        const ent = testsdk.ValidateVatResponseSchema();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'validate_vat_response_schema.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "validate_vat_response_schema", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "vat_number", "orig": "vat_number", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /vat", "json": "{\"operationId\":\"vatcomply_api_validate_vat\",\"parameters\":[{\"in\":\"query\",\"name\":\"vat_number\",\"required\":true,\"schema\":{\"title\":\"Vat Number\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"default\":\"\",\"title\":\"Address\",\"type\":\"string\"},\"country_code\":{\"title\":\"Country Code\",\"type\":\"string\"},\"name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Name\"},\"valid\":{\"title\":\"Valid\",\"type\":\"boolean\"},\"vat_number\":{\"title\":\"Vat Number\",\"type\":\"string\"}},\"required\":[\"valid\",\"vat_number\",\"country_code\"],\"title\":\"ValidateVATResponseSchema\",\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"title\":\"Error\",\"type\":\"string\"}},\"required\":[\"error\"],\"title\":\"ErrorResponse\",\"type\":\"object\"}}},\"description\":\"Bad Request\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/vat", "segments": [{ "lit": "vat" }], "select": { "exist": ["vat_number"] }, "transform": { "req": "`reqdata`", "res": "`body.name`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "validate_vat_response_schema", "name__orig": "validate_vat_response_schema", "Name": "ValidateVatResponseSchema", "name_": "validate_vat_response_schema", "name-": "validate-vat-response-schema", "NAME": "VALIDATE_VAT_RESPONSE_SCHEMA", "index$": 5 }, { "active": true, "entity": "validate_vat_response_schema", "key$": "BasicValidateVatResponseSchemaFlow", "kind": "basic", "name": "BasicValidateVatResponseSchemaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "validate_vat_response_schema_ref01", "srcdatavar": "validate_vat_response_schema_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-validate_vat_response_schema_ref01" } }], "index$": 0 }] }, 'ValidateVatResponseSchema');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let validate_vat_response_schema_ref01_data = Object.values(setup.data.existing.validate_vat_response_schema)[0];
        // LOAD
        const validate_vat_response_schema_ref01_ent = client.ValidateVatResponseSchema();
        const validate_vat_response_schema_ref01_match_dt0 = {};
        const validate_vat_response_schema_ref01_data_dt0 = (await validate_vat_response_schema_ref01_ent.load(validate_vat_response_schema_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != validate_vat_response_schema_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/validate_vat_response_schema/ValidateVatResponseSchemaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VatValidationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['validate_vat_response_schema01', 'validate_vat_response_schema02', 'validate_vat_response_schema03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID': idmap,
        'VAT_VALIDATION_TEST_LIVE': 'FALSE',
        'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID'];
    const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID'];
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
//# sourceMappingURL=ValidateVatResponseSchemaEntity.test.js.map