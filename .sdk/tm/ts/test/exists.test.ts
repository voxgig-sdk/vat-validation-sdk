
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { VatValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await VatValidationSDK.test()
    equal(null !== testsdk, true)
  })

})
