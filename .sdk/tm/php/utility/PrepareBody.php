<?php
declare(strict_types=1);

// VatValidation SDK utility: prepare_body

class VatValidationPrepareBody
{
    public static function call(VatValidationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
