# VatValidation PHP SDK



The PHP SDK for the VatValidation API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Country()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List country records

```php
try {
    // list() returns an array of Country records — iterate directly.
    $countrys = $client->Country()->list();
    foreach ($countrys as $item) {
        echo $item["capital"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $geolocate = $client->Geolocate()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$geolocate = $client->Geolocate()->load();
print_r($geolocate);
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
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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

Operations: Load.

API path: `/geolocate`

#### Rate

| Field | Description |
| --- | --- |

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
| `checksum_digits` |  |
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

Operations: Load.

API path: `/vat`

#### VatcomplyApiRoot

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/`



## Entities


### Country

Create an instance: `$country = $client->Country();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `string` |  |
| `currency` | `string` |  |
| `emoji` | `string` |  |
| `iso2` | `string` |  |
| `iso3` | `string` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `numeric_code` | `int` |  |
| `phone_code` | `string` |  |
| `region` | `string` |  |
| `subregion` | `string` |  |
| `tld` | `string` |  |

#### Example: List

```php
// list() returns an array of Country records (throws on error).
$countrys = $client->Country()->list();
```


### Currency

Create an instance: `$currency = $client->Currency();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `symbol` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Currency record (throws on error).
$currency = $client->Currency()->load();
```


### Geolocate

Create an instance: `$geolocate = $client->Geolocate();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Geolocate record (throws on error).
$geolocate = $client->Geolocate()->load();
```


### Rate

Create an instance: `$rate = $client->Rate();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Rate record (throws on error).
$rate = $client->Rate()->load();
```


### ValidateIbanResponseSchema

Create an instance: `$validate_iban_response_schema = $client->ValidateIbanResponseSchema();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` |  |
| `bank_code` | `string` |  |
| `bank_name` | `string` |  |
| `bban` | `string` |  |
| `bic` | `string` |  |
| `branch_code` | `string` |  |
| `checksum_digits` | `string` |  |
| `country_code` | `string` |  |
| `country_name` | `string` |  |
| `iban` | `string` |  |
| `in_sepa_zone` | `bool` |  |
| `valid` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ValidateIbanResponseSchema record (throws on error).
$validate_iban_response_schema = $client->ValidateIbanResponseSchema()->load(["iban" => "iban"]);
```


### ValidateVatResponseSchema

Create an instance: `$validate_vat_response_schema = $client->ValidateVatResponseSchema();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ValidateVatResponseSchema record (throws on error).
$validate_vat_response_schema = $client->ValidateVatResponseSchema()->load(["vat_number" => "vat_number"]);
```


### VatcomplyApiRoot

Create an instance: `$vatcomply_api_root = $client->VatcomplyApiRoot();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VatcomplyApiRoot record (throws on error).
$vatcomply_api_root = $client->VatcomplyApiRoot()->load();
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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
$geolocate = $client->Geolocate();
$geolocate->load();

// $geolocate->data_get() now returns the geolocate data from the last load
// $geolocate->match_get() returns the last match criteria
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
