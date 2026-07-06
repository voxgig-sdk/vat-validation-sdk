<?php
declare(strict_types=1);

// Typed models for the VatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Country entity data model. */
class Country
{
    public string $capital;
    public string $currency;
    public string $emoji;
    public string $iso2;
    public string $iso3;
    public float $latitude;
    public float $longitude;
    public string $name;
    public int $numeric_code;
    public string $phone_code;
    public string $region;
    public string $subregion;
    public string $tld;
}

/** Request payload for Country#list. */
class CountryListMatch
{
    public ?string $capital = null;
    public ?string $currency = null;
    public ?string $emoji = null;
    public ?string $iso2 = null;
    public ?string $iso3 = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?int $numeric_code = null;
    public ?string $phone_code = null;
    public ?string $region = null;
    public ?string $subregion = null;
    public ?string $tld = null;
}

/** Currency entity data model. */
class Currency
{
    public string $name;
    public string $symbol;
}

/** Request payload for Currency#load. */
class CurrencyLoadMatch
{
    public ?string $name = null;
    public ?string $symbol = null;
}

/** Geolocate entity data model. */
class Geolocate
{
    public string $capital;
    public string $country_code;
    public string $currency;
    public string $emoji;
    public mixed $ip;
    public string $iso2;
    public string $iso3;
    public float $latitude;
    public float $longitude;
    public string $name;
    public int $numeric_code;
    public string $phone_code;
    public string $region;
    public string $subregion;
    public string $tld;
}

/** Request payload for Geolocate#load. */
class GeolocateLoadMatch
{
    public ?string $capital = null;
    public ?string $country_code = null;
    public ?string $currency = null;
    public ?string $emoji = null;
    public mixed $ip = null;
    public ?string $iso2 = null;
    public ?string $iso3 = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?int $numeric_code = null;
    public ?string $phone_code = null;
    public ?string $region = null;
    public ?string $subregion = null;
    public ?string $tld = null;
}

/** Rate entity data model. */
class Rate
{
    public string $base;
    public string $date;
    public array $rate;
}

/** Request payload for Rate#load. */
class RateLoadMatch
{
    public ?string $base = null;
    public ?string $date = null;
    public ?array $rate = null;
}

/** ValidateIbanResponseSchema entity data model. */
class ValidateIbanResponseSchema
{
    public string $account_number;
    public string $bank_code;
    public string $bank_name;
    public string $bban;
    public string $bic;
    public string $branch_code;
    public string $checksum_digit;
    public string $country_code;
    public string $country_name;
    public string $iban;
    public bool $in_sepa_zone;
    public bool $valid;
}

/** Request payload for ValidateIbanResponseSchema#load. */
class ValidateIbanResponseSchemaLoadMatch
{
    public ?string $account_number = null;
    public ?string $bank_code = null;
    public ?string $bank_name = null;
    public ?string $bban = null;
    public ?string $bic = null;
    public ?string $branch_code = null;
    public ?string $checksum_digit = null;
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?string $iban = null;
    public ?bool $in_sepa_zone = null;
    public ?bool $valid = null;
}

/** ValidateVatResponseSchema entity data model. */
class ValidateVatResponseSchema
{
    public ?string $address = null;
    public string $country_code;
    public ?string $name = null;
    public bool $valid;
    public string $vat_number;
}

/** Request payload for ValidateVatResponseSchema#load. */
class ValidateVatResponseSchemaLoadMatch
{
    public ?string $address = null;
    public ?string $country_code = null;
    public ?string $name = null;
    public ?bool $valid = null;
    public ?string $vat_number = null;
}

/** VatcomplyApiRoot entity data model. */
class VatcomplyApiRoot
{
    public string $contact;
    public string $description;
    public string $documentation;
    public array $endpoint;
    public string $name;
    public string $status;
    public string $version;
}

/** Request payload for VatcomplyApiRoot#load. */
class VatcomplyApiRootLoadMatch
{
    public ?string $contact = null;
    public ?string $description = null;
    public ?string $documentation = null;
    public ?array $endpoint = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $version = null;
}

