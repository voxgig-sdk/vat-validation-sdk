# VatValidation SDK utility: make_context
require_relative '../core/context'
module VatValidationUtilities
  MakeContext = ->(ctxmap, basectx) {
    VatValidationContext.new(ctxmap, basectx)
  }
end
