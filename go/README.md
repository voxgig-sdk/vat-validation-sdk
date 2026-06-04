# VatValidation Golang SDK

The Golang SDK for the VatValidation API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/vat-validation-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/vat-validation-sdk/go=../path/to/github.com/voxgig-sdk/vat-validation-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/vat-validation-sdk/go"
    "github.com/voxgig-sdk/vat-validation-sdk/go/core"
)

func main() {
    client := sdk.NewVatValidationSDK(map[string]any{})
```

### 2. List countrys

```go
    result, err := client.Country(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewVatValidationSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VAT-VALIDATION_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewVatValidationSDK

```go
func NewVatValidationSDK(options map[string]any) *VatValidationSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *VatValidationSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### VatValidationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Country` | `(data map[string]any) VatValidationEntity` | Create a Country entity instance. |
| `Currency` | `(data map[string]any) VatValidationEntity` | Create a Currency entity instance. |
| `Geolocate` | `(data map[string]any) VatValidationEntity` | Create a Geolocate entity instance. |
| `Rate` | `(data map[string]any) VatValidationEntity` | Create a Rate entity instance. |
| `ValidateIbanResponseSchema` | `(data map[string]any) VatValidationEntity` | Create a ValidateIbanResponseSchema entity instance. |
| `ValidateVatResponseSchema` | `(data map[string]any) VatValidationEntity` | Create a ValidateVatResponseSchema entity instance. |
| `VatcomplyApiRoot` | `(data map[string]any) VatValidationEntity` | Create a VatcomplyApiRoot entity instance. |

### Entity interface (VatValidationEntity)

All entities implement the `VatValidationEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Country

| Field | Description |
| --- | --- |
| `"capital"` |  |
| `"currency"` |  |
| `"emoji"` |  |
| `"iso2"` |  |
| `"iso3"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"numeric_code"` |  |
| `"phone_code"` |  |
| `"region"` |  |
| `"subregion"` |  |
| `"tld"` |  |

Operations: List.

API path: `/countries`

#### Currency

| Field | Description |
| --- | --- |
| `"name"` |  |
| `"symbol"` |  |

Operations: Load.

API path: `/currencies`

#### Geolocate

| Field | Description |
| --- | --- |
| `"capital"` |  |
| `"country_code"` |  |
| `"currency"` |  |
| `"emoji"` |  |
| `"ip"` |  |
| `"iso2"` |  |
| `"iso3"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"numeric_code"` |  |
| `"phone_code"` |  |
| `"region"` |  |
| `"subregion"` |  |
| `"tld"` |  |

Operations: Load.

API path: `/geolocate`

#### Rate

| Field | Description |
| --- | --- |
| `"base"` |  |
| `"date"` |  |
| `"rate"` |  |

Operations: Load.

API path: `/rates`

#### ValidateIbanResponseSchema

| Field | Description |
| --- | --- |
| `"account_number"` |  |
| `"bank_code"` |  |
| `"bank_name"` |  |
| `"bban"` |  |
| `"bic"` |  |
| `"branch_code"` |  |
| `"checksum_digit"` |  |
| `"country_code"` |  |
| `"country_name"` |  |
| `"iban"` |  |
| `"in_sepa_zone"` |  |
| `"valid"` |  |

Operations: Load.

API path: `/iban`

#### ValidateVatResponseSchema

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"country_code"` |  |
| `"name"` |  |
| `"valid"` |  |
| `"vat_number"` |  |

Operations: Load.

API path: `/vat`

#### VatcomplyApiRoot

| Field | Description |
| --- | --- |
| `"contact"` |  |
| `"description"` |  |
| `"documentation"` |  |
| `"endpoint"` |  |
| `"name"` |  |
| `"status"` |  |
| `"version"` |  |

Operations: Load.

API path: `/`



## Entities


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.Country(nil).List(nil, nil)
```


### Currency

Create an instance: `currency := client.Currency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | ``$STRING`` |  |
| `symbol` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Currency(nil).Load(map[string]any{"id": "currency_id"}, nil)
```


### Geolocate

Create an instance: `geolocate := client.Geolocate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Geolocate(nil).Load(map[string]any{"id": "geolocate_id"}, nil)
```


### Rate

Create an instance: `rate := client.Rate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.Rate(nil).Load(map[string]any{"id": "rate_id"}, nil)
```


### ValidateIbanResponseSchema

Create an instance: `validate_iban_response_schema := client.ValidateIbanResponseSchema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.ValidateIbanResponseSchema(nil).Load(map[string]any{"id": "validate_iban_response_schema_id"}, nil)
```


### ValidateVatResponseSchema

Create an instance: `validate_vat_response_schema := client.ValidateVatResponseSchema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `valid` | ``$BOOLEAN`` |  |
| `vat_number` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.ValidateVatResponseSchema(nil).Load(map[string]any{"id": "validate_vat_response_schema_id"}, nil)
```


### VatcomplyApiRoot

Create an instance: `vatcomply_api_root := client.VatcomplyApiRoot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.VatcomplyApiRoot(nil).Load(map[string]any{"id": "vatcomply_api_root_id"}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/vat-validation-sdk/go/
├── vat-validation.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/vat-validation-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
