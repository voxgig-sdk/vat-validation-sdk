# VatValidation PHP SDK Reference

Complete API reference for the VatValidation PHP SDK.


## VatValidationSDK

### Constructor

```php
require_once __DIR__ . '/vatvalidation_sdk.php';

$client = new VatValidationSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
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

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): VatValidationUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

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

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CountryEntity

```php
$country = $client->Country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `emoji` | `string` | Yes |  |
| `iso2` | `string` | Yes |  |
| `iso3` | `string` | Yes |  |
| `latitude` | `float` | Yes |  |
| `longitude` | `float` | Yes |  |
| `name` | `string` | Yes |  |
| `numeric_code` | `int` | Yes |  |
| `phone_code` | `string` | Yes |  |
| `region` | `string` | Yes |  |
| `subregion` | `string` | Yes |  |
| `tld` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Country()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CurrencyEntity

```php
$currency = $client->Currency();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `symbol` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Currency()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CurrencyEntity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GeolocateEntity

```php
$geolocate = $client->Geolocate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `emoji` | `string` | Yes |  |
| `ip` | `mixed` | Yes |  |
| `iso2` | `string` | Yes |  |
| `iso3` | `string` | Yes |  |
| `latitude` | `float` | Yes |  |
| `longitude` | `float` | Yes |  |
| `name` | `string` | Yes |  |
| `numeric_code` | `int` | Yes |  |
| `phone_code` | `string` | Yes |  |
| `region` | `string` | Yes |  |
| `subregion` | `string` | Yes |  |
| `tld` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Geolocate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GeolocateEntity`

Create a new `GeolocateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RateEntity

```php
$rate = $client->Rate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `rate` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Rate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RateEntity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ValidateIbanResponseSchemaEntity

```php
$validate_iban_response_schema = $client->ValidateIbanResponseSchema();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes |  |
| `bank_code` | `string` | Yes |  |
| `bank_name` | `string` | Yes |  |
| `bban` | `string` | Yes |  |
| `bic` | `string` | Yes |  |
| `branch_code` | `string` | Yes |  |
| `checksum_digit` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `country_name` | `string` | Yes |  |
| `iban` | `string` | Yes |  |
| `in_sepa_zone` | `bool` | Yes |  |
| `valid` | `bool` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ValidateIbanResponseSchema()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ValidateIbanResponseSchemaEntity`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ValidateVatResponseSchemaEntity

```php
$validate_vat_response_schema = $client->ValidateVatResponseSchema();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `country_code` | `string` | Yes |  |
| `name` | `string` | No |  |
| `valid` | `bool` | Yes |  |
| `vat_number` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ValidateVatResponseSchema()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ValidateVatResponseSchemaEntity`

Create a new `ValidateVatResponseSchemaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VatcomplyApiRootEntity

```php
$vatcomply_api_root = $client->VatcomplyApiRoot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `documentation` | `string` | Yes |  |
| `endpoint` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->VatcomplyApiRoot()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VatcomplyApiRootEntity`

Create a new `VatcomplyApiRootEntity` instance with the same client and
options.

#### `get_name(): string`

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

