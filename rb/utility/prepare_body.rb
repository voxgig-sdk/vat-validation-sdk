# VatValidation SDK utility: prepare_body
require_relative 'media'
module VatValidationUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return VatValidationUtilities.raw_body(ctx.reqdata) if VatValidationUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
