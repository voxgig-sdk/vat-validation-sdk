

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VatValidationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ValidateVatResponseSchemaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VatValidationSDK.test()
    const ent = testsdk.ValidateVatResponseSchema()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'validate_vat_response_schema.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"validate_vat_response_schema","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"vat_number","orig":"vat_number","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /vat","json":"{\"operationId\":\"vatcomply_api_validate_vat\",\"parameters\":[{\"in\":\"query\",\"name\":\"vat_number\",\"required\":true,\"schema\":{\"title\":\"Vat Number\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"default\":\"\",\"title\":\"Address\",\"type\":\"string\"},\"country_code\":{\"title\":\"Country Code\",\"type\":\"string\"},\"name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Name\"},\"valid\":{\"title\":\"Valid\",\"type\":\"boolean\"},\"vat_number\":{\"title\":\"Vat Number\",\"type\":\"string\"}},\"required\":[\"valid\",\"vat_number\",\"country_code\"],\"title\":\"ValidateVATResponseSchema\",\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"title\":\"Error\",\"type\":\"string\"}},\"required\":[\"error\"],\"title\":\"ErrorResponse\",\"type\":\"object\"}}},\"description\":\"Bad Request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/vat","segments":[{"lit":"vat"}],"select":{"exist":["vat_number"]},"transform":{"req":"`reqdata`","res":"`body.name`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"validate_vat_response_schema","name__orig":"validate_vat_response_schema","Name":"ValidateVatResponseSchema","name_":"validate_vat_response_schema","name-":"validate-vat-response-schema","NAME":"VALIDATE_VAT_RESPONSE_SCHEMA","index$":5}, {"active":true,"entity":"validate_vat_response_schema","key$":"BasicValidateVatResponseSchemaFlow","kind":"basic","name":"BasicValidateVatResponseSchemaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"validate_vat_response_schema_ref01","srcdatavar":"validate_vat_response_schema_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validate_vat_response_schema_ref01"}}],"index$":0}]}, 'ValidateVatResponseSchema')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let validate_vat_response_schema_ref01_data = Object.values(setup.data.existing.validate_vat_response_schema)[0] as any

    // LOAD
    const validate_vat_response_schema_ref01_ent = client.ValidateVatResponseSchema()
    const validate_vat_response_schema_ref01_match_dt0: any = {}
    const validate_vat_response_schema_ref01_data_dt0 = (await validate_vat_response_schema_ref01_ent.load(validate_vat_response_schema_ref01_match_dt0)).data()
    assert(null != validate_vat_response_schema_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/validate_vat_response_schema/ValidateVatResponseSchemaTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = VatValidationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['validate_vat_response_schema01','validate_vat_response_schema02','validate_vat_response_schema03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID': idmap,
    'VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID']

  const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VAT_VALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new VatValidationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
