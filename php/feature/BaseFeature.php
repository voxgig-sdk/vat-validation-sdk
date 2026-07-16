<?php
declare(strict_types=1);

// VatValidation SDK base feature

class VatValidationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(VatValidationContext $ctx, array $options): void {}
    public function PostConstruct(VatValidationContext $ctx): void {}
    public function PostConstructEntity(VatValidationContext $ctx): void {}
    public function SetData(VatValidationContext $ctx): void {}
    public function GetData(VatValidationContext $ctx): void {}
    public function GetMatch(VatValidationContext $ctx): void {}
    public function SetMatch(VatValidationContext $ctx): void {}
    public function PrePoint(VatValidationContext $ctx): void {}
    public function PreSpec(VatValidationContext $ctx): void {}
    public function PreRequest(VatValidationContext $ctx): void {}
    public function PreResponse(VatValidationContext $ctx): void {}
    public function PreResult(VatValidationContext $ctx): void {}
    public function PreDone(VatValidationContext $ctx): void {}
    public function PreUnexpected(VatValidationContext $ctx): void {}
}
