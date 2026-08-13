# VatValidation SDK utility: make_context

from projectname_sdk.core.context import VatValidationContext


def make_context_util(ctxmap, basectx):
    return VatValidationContext(ctxmap, basectx)
