

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


describe('RateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VatValidationSDK.test()
    const ent = testsdk.Rate()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base":{"a":true,"h":"Base","n":"base","r":true,"t":"`$STRING`","key$":"base","index$":0},"date":{"a":true,"h":"Date","n":"date","r":true,"t":"`$STRING`","key$":"date","index$":1},"rates":{"a":true,"h":"Rates","n":"rates","r":true,"t":"`$OBJECT`","key$":"rates","index$":2}},"name":"rate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /rates","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"EUR","k":"query","n":"base","or":"base","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"symbol","or":"symbols","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/rates","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"rates"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rate","name__orig":"rate","Name":"Rate","name_":"rate","name-":"rate","NAME":"RATE","index$":3}, {"active":true,"entity":"rate","key$":"BasicRateFlow","kind":"basic","name":"BasicRateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"rate_ref01","srcdatavar":"rate_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rate_ref01"}}],"index$":0}]}, 'Rate', {"GET /rates":{"protocol":"http","parameters":[{"in":"query","name":"base","schema":{"anyOf":[{"type":"string"},{"type":"null"}],"default":"EUR","title":"Base"},"required":false,"index$":0},{"in":"query","name":"symbols","schema":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Symbols"},"required":false,"index$":1},{"in":"query","name":"date","schema":{"anyOf":[{"format":"date","type":"string"},{"type":"null"}],"title":"Date"},"required":false,"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rate_ref01_data = Object.values(setup.data.existing.rate)[0] as any

    // LOAD
    const rate_ref01_ent = client.Rate()
    const rate_ref01_match_dt0: any = {}
    const rate_ref01_data_dt0 = (await rate_ref01_ent.load(rate_ref01_match_dt0)).data()
    assert(null != rate_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/rate/RateTestData.json')

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
    ['rate01','rate02','rate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VAT_VALIDATION_TEST_RATE_ENTID': idmap,
    'VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VAT_VALIDATION_TEST_RATE_ENTID']

  const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VAT_VALIDATION_TEST_RATE_ENTID']
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
  
