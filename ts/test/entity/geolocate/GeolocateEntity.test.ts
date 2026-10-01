

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GeolocateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VatValidationSDK.test()
    const ent = testsdk.Geolocate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'geolocate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"capital":{"a":true,"h":"Capital","n":"capital","r":true,"t":"`$STRING`","key$":"capital","index$":0},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":true,"t":"`$STRING`","key$":"country_code","index$":1},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":2},"emoji":{"a":true,"h":"Emoji","n":"emoji","r":true,"t":"`$STRING`","key$":"emoji","index$":3},"ip":{"a":true,"h":"Ip","n":"ip","r":true,"t":"`$ANY`","key$":"ip","index$":4},"iso2":{"a":true,"h":"Iso2","n":"iso2","r":true,"t":"`$STRING`","key$":"iso2","index$":5},"iso3":{"a":true,"h":"Iso3","n":"iso3","r":true,"t":"`$STRING`","key$":"iso3","index$":6},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":true,"t":"`$NUMBER`","key$":"latitude","index$":7},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":true,"t":"`$NUMBER`","key$":"longitude","index$":8},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":9},"numeric_code":{"a":true,"h":"Numeric Code","n":"numeric_code","r":true,"t":"`$INTEGER`","key$":"numeric_code","index$":10},"phone_code":{"a":true,"h":"Phone Code","n":"phone_code","r":true,"t":"`$STRING`","key$":"phone_code","index$":11},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$STRING`","key$":"region","index$":12},"subregion":{"a":true,"h":"Subregion","n":"subregion","r":true,"t":"`$STRING`","key$":"subregion","index$":13},"tld":{"a":true,"h":"Tld","n":"tld","r":true,"t":"`$STRING`","key$":"tld","index$":14}},"name":"geolocate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /geolocate","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/geolocate","q":{},"r":{},"s":[{"lit":"geolocate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"geolocate","name__orig":"geolocate","Name":"Geolocate","name_":"geolocate","name-":"geolocate","NAME":"GEOLOCATE","index$":2}, {"active":true,"entity":"geolocate","key$":"BasicGeolocateFlow","kind":"basic","name":"BasicGeolocateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"geolocate_ref01","srcdatavar":"geolocate_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-geolocate_ref01"}}],"index$":0}]}, 'Geolocate', {"GET /geolocate":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let geolocate_ref01_data = Object.values(setup.data.existing.geolocate)[0] as any

    // LOAD
    const geolocate_ref01_ent = client.Geolocate()
    const geolocate_ref01_match_dt0: any = {}
    const geolocate_ref01_data_dt0 = (await geolocate_ref01_ent.load(geolocate_ref01_match_dt0)).data()
    assert(null != geolocate_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/geolocate/GeolocateTestData.json')

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
    ['geolocate01','geolocate02','geolocate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VAT_VALIDATION_TEST_GEOLOCATE_ENTID': idmap,
    'VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VAT_VALIDATION_TEST_GEOLOCATE_ENTID']

  const live = 'TRUE' === env.VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VAT_VALIDATION_TEST_GEOLOCATE_ENTID']
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
  
