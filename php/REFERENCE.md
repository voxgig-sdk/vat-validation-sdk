# VatValidation PHP SDK Reference

Complete API reference for the VatValidation PHP SDK.


## VatValidationSDK

### Constructor

```php
require_once __DIR__ . '/vat-validation_sdk.php';

$client = new VatValidationSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VatValidationSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = VatValidationSDK::test();
```


### Instance Methods

#### `Country($data = null)`

Create a new `CountryEntity` instance. Pass `null` for no initial data.

#### `Currency($data = null)`

Create a new `CurrencyEntity` instance. Pass `null` for no initial data.

#### `Geolocate($data = null)`

Create a new `GeolocateEntity` instance. Pass `null` for no initial data.

#### `Rate($data = null)`

Create a new `RateEntity` instance. Pass `null` for no initial data.

#### `ValidateIbanResponseSchema($data = null)`

Create a new `ValidateIbanResponseSchemaEntity` instance. Pass `null` for no initial data.

#### `ValidateVatResponseSchema($data = null)`

Create a new `ValidateVatResponseSchemaEntity` instance. Pass `null` for no initial data.

#### `VatcomplyApiRoot($data = null)`

Create a new `VatcomplyApiRootEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## CountryEntity

```php
$country = $client->Country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | ``$STRING`` | Yes |  |
| `currency` | ``$STRING`` | Yes |  |
| `emoji` | ``$STRING`` | Yes |  |
| `iso2` | ``$STRING`` | Yes |  |
| `iso3` | ``$STRING`` | Yes |  |
| `latitude` | ``$NUMBER`` | Yes |  |
| `longitude` | ``$NUMBER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `numeric_code` | ``$INTEGER`` | Yes |  |
| `phone_code` | ``$STRING`` | Yes |  |
| `region` | ``$STRING`` | Yes |  |
| `subregion` | ``$STRING`` | Yes |  |
| `tld` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Country()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CurrencyEntity

```php
$currency = $client->Currency();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | Yes |  |
| `symbol` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Currency()->load(["id" => "currency_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CurrencyEntity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GeolocateEntity

```php
$geolocate = $client->Geolocate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | Yes |  |
| `currency` | ``$STRING`` | Yes |  |
| `emoji` | ``$STRING`` | Yes |  |
| `ip` | ``$ANY`` | Yes |  |
| `iso2` | ``$STRING`` | Yes |  |
| `iso3` | ``$STRING`` | Yes |  |
| `latitude` | ``$NUMBER`` | Yes |  |
| `longitude` | ``$NUMBER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `numeric_code` | ``$INTEGER`` | Yes |  |
| `phone_code` | ``$STRING`` | Yes |  |
| `region` | ``$STRING`` | Yes |  |
| `subregion` | ``$STRING`` | Yes |  |
| `tld` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Geolocate()->load(["id" => "geolocate_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GeolocateEntity`

Create a new `GeolocateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RateEntity

```php
$rate = $client->Rate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Rate()->load(["id" => "rate_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RateEntity`

Create a new `RateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ValidateIbanResponseSchemaEntity

```php
$validate_iban_response_schema = $client->ValidateIbanResponseSchema();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | ``$STRING`` | Yes |  |
| `bank_code` | ``$STRING`` | Yes |  |
| `bank_name` | ``$STRING`` | Yes |  |
| `bban` | ``$STRING`` | Yes |  |
| `bic` | ``$STRING`` | Yes |  |
| `branch_code` | ``$STRING`` | Yes |  |
| `checksum_digit` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | Yes |  |
| `country_name` | ``$STRING`` | Yes |  |
| `iban` | ``$STRING`` | Yes |  |
| `in_sepa_zone` | ``$BOOLEAN`` | Yes |  |
| `valid` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->ValidateIbanResponseSchema()->load(["id" => "validate_iban_response_schema_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ValidateIbanResponseSchemaEntity`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ValidateVatResponseSchemaEntity

```php
$validate_vat_response_schema = $client->ValidateVatResponseSchema();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | No |  |
| `valid` | ``$BOOLEAN`` | Yes |  |
| `vat_number` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->ValidateVatResponseSchema()->load(["id" => "validate_vat_response_schema_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ValidateVatResponseSchemaEntity`

Create a new `ValidateVatResponseSchemaEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VatcomplyApiRootEntity

```php
$vatcomply_api_root = $client->VatcomplyApiRoot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | ``$STRING`` | Yes |  |
| `description` | ``$STRING`` | Yes |  |
| `documentation` | ``$STRING`` | Yes |  |
| `endpoint` | ``$OBJECT`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->VatcomplyApiRoot()->load(["id" => "vatcomply_api_root_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VatcomplyApiRootEntity`

Create a new `VatcomplyApiRootEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new VatValidationSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

