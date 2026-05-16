
import { Context } from './Context'


class VatValidationError extends Error {

  isVatValidationError = true

  sdk = 'VatValidation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  VatValidationError
}

