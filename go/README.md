# VatValidation Golang SDK



The Golang SDK for the VatValidation API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Country(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/vat-validation-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/vat-validation-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/vat-validation-sdk/go=../vat-validation-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/vat-validation-sdk/go"
)

func main() {
    client := sdk.New()

    // List country records — the value is the array of records itself.
    countrys, err := client.Country(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range countrys.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = countrys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

country, err := client.Country(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(country) // the returned mock data
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
VAT_VALIDATION_TEST_LIVE=TRUE
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    country, err := client.Country(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // country is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `capital` | `string` |  |
| `currency` | `string` |  |
| `emoji` | `string` |  |
| `iso2` | `string` |  |
| `iso3` | `string` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `numeric_code` | `int` |  |
| `phone_code` | `string` |  |
| `region` | `string` |  |
| `subregion` | `string` |  |
| `tld` | `string` |  |

#### Example: List

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(countrys) // the array of records
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
| `name` | `string` |  |
| `symbol` | `string` |  |

#### Example: Load

```go
currency, err := client.Currency(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(currency) // the loaded record
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
| `capital` | `string` |  |
| `country_code` | `string` |  |
| `currency` | `string` |  |
| `emoji` | `string` |  |
| `ip` | `any` |  |
| `iso2` | `string` |  |
| `iso3` | `string` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `numeric_code` | `int` |  |
| `phone_code` | `string` |  |
| `region` | `string` |  |
| `subregion` | `string` |  |
| `tld` | `string` |  |

#### Example: Load

```go
geolocate, err := client.Geolocate(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(geolocate) // the loaded record
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
| `base` | `string` |  |
| `date` | `string` |  |
| `rate` | `map[string]any` |  |

#### Example: Load

```go
rate, err := client.Rate(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rate) // the loaded record
```


### ValidateIbanResponseSchema

Create an instance: `validateIbanResponseSchema := client.ValidateIbanResponseSchema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` |  |
| `bank_code` | `string` |  |
| `bank_name` | `string` |  |
| `bban` | `string` |  |
| `bic` | `string` |  |
| `branch_code` | `string` |  |
| `checksum_digit` | `string` |  |
| `country_code` | `string` |  |
| `country_name` | `string` |  |
| `iban` | `string` |  |
| `in_sepa_zone` | `bool` |  |
| `valid` | `bool` |  |

#### Example: Load

```go
validateIbanResponseSchema, err := client.ValidateIbanResponseSchema(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(validateIbanResponseSchema) // the loaded record
```


### ValidateVatResponseSchema

Create an instance: `validateVatResponseSchema := client.ValidateVatResponseSchema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `country_code` | `string` |  |
| `name` | `string` |  |
| `valid` | `bool` |  |
| `vat_number` | `string` |  |

#### Example: Load

```go
validateVatResponseSchema, err := client.ValidateVatResponseSchema(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(validateVatResponseSchema) // the loaded record
```


### VatcomplyApiRoot

Create an instance: `vatcomplyApiRoot := client.VatcomplyApiRoot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `string` |  |
| `description` | `string` |  |
| `documentation` | `string` |  |
| `endpoint` | `map[string]any` |  |
| `name` | `string` |  |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
vatcomplyApiRoot, err := client.VatcomplyApiRoot(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(vatcomplyApiRoot) // the loaded record
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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
country := client.Country(nil)
country.List(nil, nil)

// country.Data() now returns the country data from the last list
// country.Match() returns the last match criteria
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
