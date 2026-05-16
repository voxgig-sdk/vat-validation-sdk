# VatValidation SDK utility: feature_add
module VatValidationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
