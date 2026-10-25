

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VatValidationSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VatValidationSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ValidateIbanResponseSchema().load({"iban":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'validate_iban_response_schema.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_number":{"a":true,"h":"Account Number","n":"account_number","r":true,"t":"`$STRING`","key$":"account_number","index$":0},"bank_code":{"a":true,"h":"Bank Code","n":"bank_code","r":true,"t":"`$STRING`","key$":"bank_code","index$":1},"bank_name":{"a":true,"h":"Bank Name","n":"bank_name","r":true,"t":"`$STRING`","key$":"bank_name","index$":2},"bban":{"a":true,"h":"Bban","n":"bban","r":true,"t":"`$STRING`","key$":"bban","index$":3},"bic":{"a":true,"h":"Bic","n":"bic","r":true,"t":"`$STRING`","key$":"bic","index$":4},"branch_code":{"a":true,"h":"Branch Code","n":"branch_code","r":true,"t":"`$STRING`","key$":"branch_code","index$":5},"checksum_digits":{"a":true,"h":"Checksum Digits","n":"checksum_digits","r":true,"t":"`$STRING`","key$":"checksum_digits","index$":6},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":true,"t":"`$STRING`","key$":"country_code","index$":7},"country_name":{"a":true,"h":"Country Name","n":"country_name","r":true,"t":"`$STRING`","key$":"country_name","index$":8},"iban":{"a":true,"h":"Iban","n":"iban","r":true,"t":"`$STRING`","key$":"iban","index$":9},"in_sepa_zone":{"a":true,"h":"In Sepa Zone","n":"in_sepa_zone","r":true,"t":"`$BOOLEAN`","key$":"in_sepa_zone","index$":10},"valid":{"a":true,"h":"Valid","n":"valid","r":true,"t":"`$BOOLEAN`","key$":"valid","index$":11}},"name":"validate_iban_response_schema","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /iban","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"iban","or":"iban","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/iban","q":{"exist":["iban"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"iban"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"validate_iban_response_schema","name__orig":"validate_iban_response_schema","Name":"ValidateIbanResponseSchema","name_":"validate_iban_response_schema","name-":"validate-iban-response-schema","NAME":"VALIDATE_IBAN_RESPONSE_SCHEMA","index$":4}, {"active":true,"entity":"validate_iban_response_schema","key$":"BasicValidateIbanResponseSchemaFlow","kind":"basic","name":"BasicValidateIbanResponseSchemaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"validate_iban_response_schema_ref01","srcdatavar":"validate_iban_response_schema_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validate_iban_response_schema_ref01"}}],"index$":0}]}, 'ValidateIbanResponseSchema', {"GET /iban":{"protocol":"http","parameters":[{"in":"query","name":"iban","schema":{"maxLength":34,"title":"IBAN","type":"string"},"required":true,"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
