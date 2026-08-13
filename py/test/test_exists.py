# VatValidation SDK exists test

import pytest
from vatvalidation_sdk import VatValidationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = VatValidationSDK.test(None, None)
        assert testsdk is not None
