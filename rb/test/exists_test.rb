# VatValidation SDK exists test

require "minitest/autorun"
require_relative "../VatValidation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = VatValidationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
