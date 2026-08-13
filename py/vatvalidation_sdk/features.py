# VatValidation SDK feature factory

from vatvalidation_sdk.feature.base_feature import VatValidationBaseFeature
from vatvalidation_sdk.feature.test_feature import VatValidationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: VatValidationBaseFeature(),
        "test": lambda: VatValidationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
