<?php
declare(strict_types=1);

// VatValidation SDK utility: feature_add

class VatValidationFeatureAdd
{
    public static function call(VatValidationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
