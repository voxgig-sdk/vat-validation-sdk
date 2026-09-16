

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"geolocate","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /geolocate","json":"{\"operationId\":\"vatcomply_api_geolocate\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"capital\":{\"title\":\"Capital\",\"type\":\"string\"},\"country_code\":{\"title\":\"Country Code\",\"type\":\"string\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"emoji\":{\"title\":\"Emoji\",\"type\":\"string\"},\"ip\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Ip\"},\"iso2\":{\"title\":\"Iso2\",\"type\":\"string\"},\"iso3\":{\"title\":\"Iso3\",\"type\":\"string\"},\"latitude\":{\"title\":\"Latitude\",\"type\":\"number\"},\"longitude\":{\"title\":\"Longitude\",\"type\":\"number\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"},\"numeric_code\":{\"title\":\"Numeric Code\",\"type\":\"integer\"},\"phone_code\":{\"title\":\"Phone Code\",\"type\":\"string\"},\"region\":{\"title\":\"Region\",\"type\":\"string\"},\"subregion\":{\"title\":\"Subregion\",\"type\":\"string\"},\"tld\":{\"title\":\"Tld\",\"type\":\"string\"}},\"required\":[\"iso2\",\"iso3\",\"country_code\",\"name\",\"numeric_code\",\"phone_code\",\"capital\",\"currency\",\"tld\",\"region\",\"subregion\",\"latitude\",\"longitude\",\"emoji\",\"ip\"],\"title\":\"GeolocateResponse\",\"type\":\"object\"}}},\"description\":\"OK\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"title\":\"Error\",\"type\":\"string\"}},\"required\":[\"error\"],\"title\":\"ErrorResponse\",\"type\":\"object\"}}},\"description\":\"Not Found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/geolocate","segments":[{"lit":"geolocate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.ip`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"geolocate","name__orig":"geolocate","Name":"Geolocate","name_":"geolocate","name-":"geolocate","NAME":"GEOLOCATE","index$":2}, {"active":true,"entity":"geolocate","key$":"BasicGeolocateFlow","kind":"basic","name":"BasicGeolocateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"geolocate_ref01","srcdatavar":"geolocate_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-geolocate_ref01"}}],"index$":0}]}, 'Geolocate')
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
  
