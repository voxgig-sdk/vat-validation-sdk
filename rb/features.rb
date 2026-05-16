# VatValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module VatValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      VatValidationBaseFeature.new
    when "test"
      VatValidationTestFeature.new
    else
      VatValidationBaseFeature.new
    end
  end
end
