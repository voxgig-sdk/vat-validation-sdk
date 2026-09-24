
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { VatValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = VatValidationSDK.test()
    equal(testsdk instanceof VatValidationSDK, true,
      'VatValidationSDK.test() must return a client synchronously')
  })

})
