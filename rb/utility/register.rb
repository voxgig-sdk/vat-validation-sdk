# VatValidation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

VatValidationUtility.registrar = ->(u) {
  u.clean = VatValidationUtilities::Clean
  u.done = VatValidationUtilities::Done
  u.make_error = VatValidationUtilities::MakeError
  u.feature_add = VatValidationUtilities::FeatureAdd
  u.feature_hook = VatValidationUtilities::FeatureHook
  u.feature_init = VatValidationUtilities::FeatureInit
  u.fetcher = VatValidationUtilities::Fetcher
  u.make_fetch_def = VatValidationUtilities::MakeFetchDef
  u.make_context = VatValidationUtilities::MakeContext
  u.make_options = VatValidationUtilities::MakeOptions
  u.make_request = VatValidationUtilities::MakeRequest
  u.make_response = VatValidationUtilities::MakeResponse
  u.make_result = VatValidationUtilities::MakeResult
  u.make_point = VatValidationUtilities::MakePoint
  u.make_spec = VatValidationUtilities::MakeSpec
  u.make_url = VatValidationUtilities::MakeUrl
  u.param = VatValidationUtilities::Param
  u.prepare_auth = VatValidationUtilities::PrepareAuth
  u.prepare_body = VatValidationUtilities::PrepareBody
  u.prepare_headers = VatValidationUtilities::PrepareHeaders
  u.prepare_method = VatValidationUtilities::PrepareMethod
  u.prepare_params = VatValidationUtilities::PrepareParams
  u.prepare_path = VatValidationUtilities::PreparePath
  u.prepare_query = VatValidationUtilities::PrepareQuery
  u.result_basic = VatValidationUtilities::ResultBasic
  u.result_body = VatValidationUtilities::ResultBody
  u.result_headers = VatValidationUtilities::ResultHeaders
  u.transform_request = VatValidationUtilities::TransformRequest
  u.transform_response = VatValidationUtilities::TransformResponse
}
