# VatValidation Ruby SDK



The Ruby SDK for the VatValidation API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Country` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/vat-validation-sdk/releases](https://github.com/voxgig-sdk/vat-validation-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "VatValidation_sdk"

client = VatValidationSDK.new
```

### 2. List country records

```ruby
begin
  # list returns an Array of Country records — iterate directly.
  countrys = client.Country.list
  countrys.each do |item|
    puts "#{item["capital"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  geolocate = client.Geolocate.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = VatValidationSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
geolocate = client.Geolocate.load()
puts geolocate
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = VatValidationSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VAT_VALIDATION_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### VatValidationSDK

```ruby
require_relative "VatValidation_sdk"
client = VatValidationSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = VatValidationSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### VatValidationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Currency` | `(data) -> CurrencyEntity` | Create a Currency entity instance. |
| `Geolocate` | `(data) -> GeolocateEntity` | Create a Geolocate entity instance. |
| `Rate` | `(data) -> RateEntity` | Create a Rate entity instance. |
| `ValidateIbanResponseSchema` | `(data) -> ValidateIbanResponseSchemaEntity` | Create a ValidateIbanResponseSchema entity instance. |
| `ValidateVatResponseSchema` | `(data) -> ValidateVatResponseSchemaEntity` | Create a ValidateVatResponseSchema entity instance. |
| `VatcomplyApiRoot` | `(data) -> VatcomplyApiRootEntity` | Create a VatcomplyApiRoot entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `VatValidationError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `country = client.Country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `String` |  |
| `currency` | `String` |  |
| `emoji` | `String` |  |
| `iso2` | `String` |  |
| `iso3` | `String` |  |
| `latitude` | `Float` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |
| `numeric_code` | `Integer` |  |
| `phone_code` | `String` |  |
| `region` | `String` |  |
| `subregion` | `String` |  |
| `tld` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Country records (raises on error).
countrys = client.Country.list
```


### Currency

Create an instance: `currency = client.Currency`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` |  |
| `symbol` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Currency record (raises on error).
currency = client.Currency.load()
```


### Geolocate

Create an instance: `geolocate = client.Geolocate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Geolocate record (raises on error).
geolocate = client.Geolocate.load()
```


### Rate

Create an instance: `rate = client.Rate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Rate record (raises on error).
rate = client.Rate.load()
```


### ValidateIbanResponseSchema

Create an instance: `validate_iban_response_schema = client.ValidateIbanResponseSchema`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `String` |  |
| `bank_code` | `String` |  |
| `bank_name` | `String` |  |
| `bban` | `String` |  |
| `bic` | `String` |  |
| `branch_code` | `String` |  |
| `checksum_digits` | `String` |  |
| `country_code` | `String` |  |
| `country_name` | `String` |  |
| `iban` | `String` |  |
| `in_sepa_zone` | `Boolean` |  |
| `valid` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ValidateIbanResponseSchema record (raises on error).
validate_iban_response_schema = client.ValidateIbanResponseSchema.load()
```


### ValidateVatResponseSchema

Create an instance: `validate_vat_response_schema = client.ValidateVatResponseSchema`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ValidateVatResponseSchema record (raises on error).
validate_vat_response_schema = client.ValidateVatResponseSchema.load()
```


### VatcomplyApiRoot

Create an instance: `vatcomply_api_root = client.VatcomplyApiRoot`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VatcomplyApiRoot record (raises on error).
vatcomply_api_root = client.VatcomplyApiRoot.load()
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── VatValidation_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`VatValidation_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
geolocate = client.Geolocate
geolocate.load()

# geolocate.data_get now returns the geolocate data from the last load
# geolocate.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
