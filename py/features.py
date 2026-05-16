# VatValidation SDK feature factory

from feature.base_feature import VatValidationBaseFeature
from feature.test_feature import VatValidationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: VatValidationBaseFeature(),
        "test": lambda: VatValidationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
