package = "voxgig-sdk-vat-validation"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/vat-validation-sdk.git"
}
description = {
  summary = "VatValidation SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["vat-validation_sdk"] = "vat-validation_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
