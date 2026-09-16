

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


describe('ValidateIbanResponseSchemaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VatValidationSDK.test()
    const ent = testsdk.ValidateIbanResponseSchema()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'validate_iban_response_schema.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"account_number","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"bank_code","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"bank_name","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"bban","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"bic","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"branch_code","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"checksum_digits","req":true,"type":"`$STRING`","index$":6},{"active":true,"name":"country_code","req":true,"type":"`$STRING`","index$":7},{"active":true,"name":"country_name","req":true,"type":"`$STRING`","index$":8},{"active":true,"name":"iban","req":true,"type":"`$STRING`","index$":9},{"active":true,"name":"in_sepa_zone","req":true,"type":"`$BOOLEAN`","index$":10},{"active":true,"name":"valid","req":true,"type":"`$BOOLEAN`","index$":11}],"name":"validate_iban_response_schema","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"iban","orig":"iban","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /iban","json":"{\"operationId\":\"vatcomply_api_validate_iban\",\"parameters\":[{\"in\":\"query\",\"name\":\"iban\",\"required\":true,\"schema\":{\"maxLength\":34,\"title\":\"IBAN\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"account_number\":{\"title\":\"Account Number\",\"type\":\"string\"},\"bank_code\":{\"title\":\"Bank Code\",\"type\":\"string\"},\"bank_name\":{\"title\":\"Bank Name\",\"type\":\"string\"},\"bban\":{\"title\":\"Bban\",\"type\":\"string\"},\"bic\":{\"title\":\"Bic\",\"type\":\"string\"},\"branch_code\":{\"title\":\"Branch Code\",\"type\":\"string\"},\"checksum_digits\":{\"title\":\"Checksum Digits\",\"type\":\"string\"},\"country_code\":{\"title\":\"Country Code\",\"type\":\"string\"},\"country_name\":{\"title\":\"Country Name\",\"type\":\"string\"},\"iban\":{\"maxLength\":34,\"title\":\"IBAN\",\"type\":\"string\"},\"in_sepa_zone\":{\"title\":\"In Sepa Zone\",\"type\":\"boolean\"},\"valid\":{\"title\":\"Valid\",\"type\":\"boolean\"}},\"required\":[\"valid\",\"iban\",\"bank_name\",\"bic\",\"country_code\",\"country_name\",\"checksum_digits\",\"bank_code\",\"branch_code\",\"account_number\",\"bban\",\"in_sepa_zone\"],\"title\":\"ValidateIBANResponseSchema\",\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"title\":\"Error\",\"type\":\"string\"}},\"required\":[\"error\"],\"title\":\"ErrorResponse\",\"type\":\"object\"}}},\"description\":\"Bad Request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/iban","segments":[{"lit":"iban"}],"select":{"exist":["iban"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"validate_iban_response_schema","name__orig":"validate_iban_response_schema","Name":"ValidateIbanResponseSchema","name_":"validate_iban_response_schema","name-":"validate-iban-response-schema","NAME":"VALIDATE_IBAN_RESPONSE_SCHEMA","index$":4}, {"active":true,"entity":"validate_iban_response_schema","key$":"BasicValidateIbanResponseSchemaFlow","kind":"basic","name":"BasicValidateIbanResponseSchemaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"validate_iban_response_schema_ref01","srcdatavar":"validate_iban_response_schema_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validate_iban_response_schema_ref01"}}],"index$":0}]}, 'ValidateIbanResponseSchema')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let validate_iban_response_schema_ref01_data = Object.values(setup.data.existing.validate_iban_response_schema)[0] as any

    // LOAD
    const validate_iban_response_schema_ref01_ent = client.ValidateIbanResponseSchema()
    const validate_iban_response_schema_ref01_match_dt0: any = {}
    const validate_iban_response_schema_ref01_data_dt0 = (await validate_iban_response_schema_ref01_ent.load(validate_iban_response_schema_ref01_match_dt0)).data()
    assert(null != validate_iban_response_schema_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/validate_iban_response_schema/ValidateIbanResponseSchemaTestData.json')

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
    ['validate_iban_response_schema01','validate_iban_response_schema02','validate_iban_response_schema03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID': idmap,
    'VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID']

  const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID']
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
  
