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
| `name` | ``$STRING`` | Yes |  |
| `symbol` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Currency():load({ id = "currency_id" })
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Geolocate():load({ id = "geolocate_id" })
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Rate():load({ id = "rate_id" })
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ValidateIbanResponseSchema():load({ id = "validate_iban_response_schema_id" })
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | No |  |
| `valid` | ``$BOOLEAN`` | Yes |  |
| `vat_number` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ValidateVatResponseSchema():load({ id = "validate_vat_response_schema_id" })
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:VatcomplyApiRoot():load({ id = "vatcomply_api_root_id" })
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

