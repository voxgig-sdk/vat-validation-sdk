<?php
declare(strict_types=1);

// VatValidation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class VatValidationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new VatValidationBaseFeature();
            case "test":
                return new VatValidationTestFeature();
            default:
                return new VatValidationBaseFeature();
        }
    }
}
