

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"geolocate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /geolocate","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/geolocate","q":{},"r":{},"s":[{"lit":"geolocate"}],"t":{"req":"`reqdata`","res":"`body.ip`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"geolocate","name__orig":"geolocate","Name":"Geolocate","name_":"geolocate","name-":"geolocate","NAME":"GEOLOCATE","index$":2}, {"active":true,"entity":"geolocate","key$":"BasicGeolocateFlow","kind":"basic","name":"BasicGeolocateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"geolocate_ref01","srcdatavar":"geolocate_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-geolocate_ref01"}}],"index$":0}]}, 'Geolocate', {"GET /geolocate":{"protocol":"http","operationId":"vatcomply_api_geolocate","responses":{"200":{"description":"OK","content":{"application/json":{"schema":{"properties":{"iso2":{"key$":"iso2","title":"Iso2","type":"string"},"iso3":{"key$":"iso3","title":"Iso3","type":"string"},"country_code":{"key$":"country_code","title":"Country Code","type":"string"},"name":{"key$":"name","title":"Name","type":"string"},"numeric_code":{"key$":"numeric_code","title":"Numeric Code","type":"integer"},"phone_code":{"key$":"phone_code","title":"Phone Code","type":"string"},"capital":{"key$":"capital","title":"Capital","type":"string"},"currency":{"key$":"currency","title":"Currency","type":"string"},"tld":{"key$":"tld","title":"Tld","type":"string"},"region":{"key$":"region","title":"Region","type":"string"},"subregion":{"key$":"subregion","title":"Subregion","type":"string"},"latitude":{"key$":"latitude","title":"Latitude","type":"number"},"longitude":{"key$":"longitude","title":"Longitude","type":"number"},"emoji":{"key$":"emoji","title":"Emoji","type":"string"},"ip":{"anyOf":[{"type":"string"},{"type":"null"}],"key$":"ip","title":"Ip"}},"required":["iso2","iso3","country_code","name","numeric_code","phone_code","capital","currency","tld","region","subregion","latitude","longitude","emoji","ip"],"title":"GeolocateResponse","type":"object","x-ref":"#/components/schemas/GeolocateResponse"}}}},"404":{"description":"Not Found","content":{"application/json":{"schema":{"properties":{"error":{"title":"Error","type":"string"}},"required":["error"],"title":"ErrorResponse","type":"object","x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
