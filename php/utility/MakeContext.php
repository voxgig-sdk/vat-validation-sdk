<?php
declare(strict_types=1);

// VatValidation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class VatValidationMakeContext
{
    public static function call(array $ctxmap, ?VatValidationContext $basectx): VatValidationContext
    {
        return new VatValidationContext($ctxmap, $basectx);
    }
}
