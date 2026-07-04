# VatValidation PHP SDK



The PHP SDK for the VatValidation API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/vat-validation-sdk/releases](https://github.com/voxgig-sdk/vat-validation-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'vatvalidation_sdk.php';

$client = new VatValidationSDK();
```

### 2. List countrys

```php
try {
    $result = $client->country()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = VatValidationSDK::test();

$result = $client->country()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new VatValidationSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
VAT_VALIDATION_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### VatValidationSDK

```php
require_once 'vatvalidation_sdk.php';
$client = new VatValidationSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = VatValidationSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### VatValidationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Country` | `($data): CountryEntity` | Create a Country entity instance. |
| `Currency` | `($data): CurrencyEntity` | Create a Currency entity instance. |
| `Geolocate` | `($data): GeolocateEntity` | Create a Geolocate entity instance. |
| `Rate` | `($data): RateEntity` | Create a Rate entity instance. |
| `ValidateIbanResponseSchema` | `($data): ValidateIbanResponseSchemaEntity` | Create a ValidateIbanResponseSchema entity instance. |
| `ValidateVatResponseSchema` | `($data): ValidateVatResponseSchemaEntity` | Create a ValidateVatResponseSchema entity instance. |
| `VatcomplyApiRoot` | `($data): VatcomplyApiRootEntity` | Create a VatcomplyApiRoot entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Country

| Field | Description |
| --- | --- |
| `capital` |  |
| `currency` |  |
| `emoji` |  |
| `iso2` |  |
| `iso3` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `numeric_code` |  |
| `phone_code` |  |
| `region` |  |
| `subregion` |  |
| `tld` |  |

Operations: List.

API path: `/countries`

#### Currency

| Field | Description |
| --- | --- |
| `name` |  |
| `symbol` |  |

Operations: Load.

API path: `/currencies`

#### Geolocate

| Field | Description |
| --- | --- |
| `capital` |  |
| `country_code` |  |
| `currency` |  |
| `emoji` |  |
| `ip` |  |
| `iso2` |  |
| `iso3` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `numeric_code` |  |
| `phone_code` |  |
| `region` |  |
| `subregion` |  |
| `tld` |  |

Operations: Load.

API path: `/geolocate`

#### Rate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |

Operations: Load.

API path: `/rates`

#### ValidateIbanResponseSchema

| Field | Description |
| --- | --- |
| `account_number` |  |
| `bank_code` |  |
| `bank_name` |  |
| `bban` |  |
| `bic` |  |
| `branch_code` |  |
| `checksum_digit` |  |
| `country_code` |  |
| `country_name` |  |
| `iban` |  |
| `in_sepa_zone` |  |
| `valid` |  |

Operations: Load.

API path: `/iban`

#### ValidateVatResponseSchema

| Field | Description |
| --- | --- |
| `address` |  |
| `country_code` |  |
| `name` |  |
| `valid` |  |
| `vat_number` |  |

Operations: Load.

API path: `/vat`

#### VatcomplyApiRoot

| Field | Description |
| --- | --- |
| `contact` |  |
| `description` |  |
| `documentation` |  |
| `endpoint` |  |
| `name` |  |
| `status` |  |
| `version` |  |

Operations: Load.

API path: `/`



## Entities


### Country

Create an instance: `const country = client.country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `emoji` | ``$STRING`` |  |
| `iso2` | ``$STRING`` |  |
| `iso3` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `numeric_code` | ``$INTEGER`` |  |
| `phone_code` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `subregion` | ``$STRING`` |  |
| `tld` | ``$STRING`` |  |

#### Example: List

```ts
const countrys = await client.country.list()
```


### Currency

Create an instance: `const currency = client.currency`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | ``$STRING`` |  |
| `symbol` | ``$STRING`` |  |

#### Example: Load

```ts
const currency = await client.currency.load({ id: 'currency_id' })
```


### Geolocate

Create an instance: `const geolocate = client.geolocate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `emoji` | ``$STRING`` |  |
| `ip` | ``$ANY`` |  |
| `iso2` | ``$STRING`` |  |
| `iso3` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `numeric_code` | ``$INTEGER`` |  |
| `phone_code` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `subregion` | ``$STRING`` |  |
| `tld` | ``$STRING`` |  |

#### Example: Load

```ts
const geolocate = await client.geolocate.load({ id: 'geolocate_id' })
```


### Rate

Create an instance: `const rate = client.rate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |

#### Example: Load

```ts
const rate = await client.rate.load({ id: 'rate_id' })
```


### ValidateIbanResponseSchema

Create an instance: `const validate_iban_response_schema = client.validate_iban_response_schema`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | ``$STRING`` |  |
| `bank_code` | ``$STRING`` |  |
| `bank_name` | ``$STRING`` |  |
| `bban` | ``$STRING`` |  |
| `bic` | ``$STRING`` |  |
| `branch_code` | ``$STRING`` |  |
| `checksum_digit` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `country_name` | ``$STRING`` |  |
| `iban` | ``$STRING`` |  |
| `in_sepa_zone` | ``$BOOLEAN`` |  |
| `valid` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const validate_iban_response_schema = await client.validate_iban_response_schema.load({ id: 'validate_iban_response_schema_id' })
```


### ValidateVatResponseSchema

Create an instance: `const validate_vat_response_schema = client.validate_vat_response_schema`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `valid` | ``$BOOLEAN`` |  |
| `vat_number` | ``$STRING`` |  |

#### Example: Load

```ts
const validate_vat_response_schema = await client.validate_vat_response_schema.load({ id: 'validate_vat_response_schema_id' })
```


### VatcomplyApiRoot

Create an instance: `const vatcomply_api_root = client.vatcomply_api_root`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `documentation` | ``$STRING`` |  |
| `endpoint` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const vatcomply_api_root = await client.vatcomply_api_root.load({ id: 'vatcomply_api_root_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── vatvalidation_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`vatvalidation_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$country = $client->country();
$country->load(["id" => "example_id"]);

// $country->dataGet() now returns the loaded country data
// $country->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
