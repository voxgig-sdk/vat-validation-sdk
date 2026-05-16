-- VatValidation SDK error

local VatValidationError = {}
VatValidationError.__index = VatValidationError


function VatValidationError.new(code, msg, ctx)
  local self = setmetatable({}, VatValidationError)
  self.is_sdk_error = true
  self.sdk = "VatValidation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function VatValidationError:error()
  return self.msg
end


function VatValidationError:__tostring()
  return self.msg
end


return VatValidationError
