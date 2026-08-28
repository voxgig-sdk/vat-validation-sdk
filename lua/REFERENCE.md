# VatValidation Lua SDK Reference

Complete API reference for the VatValidation Lua SDK.


## VatValidationSDK

### Constructor

```lua
local sdk = require("vat-validation_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Country(data)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Currency(data)`

Create a new `Currency` entity instance. Pass `nil` for no initial data.

#### `Geolocate(data)`

Create a new `Geolocate` entity instance. Pass `nil` for no initial data.

#### `Rate(data)`

Create a new `Rate` entity instance. Pass `nil` for no initial data.

#### `ValidateIbanResponseSchema(data)`

Create a new `ValidateIbanResponseSchema` entity instance. Pass `nil` for no initial data.

#### `ValidateVatResponseSchema(data)`

Create a new `ValidateVatResponseSchema` entity instance. Pass `nil` for no initial data.

#### `VatcomplyApiRoot(data)`

Create a new `VatcomplyApiRoot` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CountryEntity

```lua
local country = client:Country(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `emoji` | `string` | Yes |  |
| `iso2` | `string` | Yes |  |
| `iso3` | `string` | Yes |  |
| `latitude` | `number` | Yes |  |
| `longitude` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `numeric_code` | `number` | Yes |  |
| `phone_code` | `string` | Yes |  |
| `region` | `string` | Yes |  |
| `subregion` | `string` | Yes |  |
| `tld` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Country():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CurrencyEntity

```lua
local currency = client:Currency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes |  |
| `symbol` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Currency():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GeolocateEntity

```lua
local geolocate = client:Geolocate(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Geolocate():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeolocateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RateEntity

```lua
local rate = client:Rate(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Rate():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ValidateIbanResponseSchemaEntity

```lua
local validate_iban_response_schema = client:ValidateIbanResponseSchema(nil)
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
| `checksum_digits` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `country_name` | `string` | Yes |  |
| `iban` | `string` | Yes |  |
| `in_sepa_zone` | `boolean` | Yes |  |
| `valid` | `boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ValidateIbanResponseSchema():load({ iban = "iban" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ValidateVatResponseSchemaEntity

```lua
local validate_vat_response_schema = client:ValidateVatResponseSchema(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ValidateVatResponseSchema():load({ vat_number = "vat_number" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ValidateVatResponseSchemaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VatcomplyApiRootEntity

```lua
local vatcomply_api_root = client:VatcomplyApiRoot(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:VatcomplyApiRoot():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VatcomplyApiRootEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

