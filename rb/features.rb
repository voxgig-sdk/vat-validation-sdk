# VatValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module VatValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      VatValidationBaseFeature.new
    when "ratelimit"
      VatValidationRatelimitFeature.new
    when "retry"
      VatValidationRetryFeature.new
    when "test"
      VatValidationTestFeature.new
    when "timeout"
      VatValidationTimeoutFeature.new
    else
      VatValidationBaseFeature.new
    end
  end
end
