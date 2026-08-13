# VatValidation SDK utility: make_context

from vatvalidation_sdk.core.context import VatValidationContext


def make_context_util(ctxmap, basectx):
    return VatValidationContext(ctxmap, basectx)
