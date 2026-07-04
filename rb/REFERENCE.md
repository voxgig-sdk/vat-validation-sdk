# VatValidation Ruby SDK Reference

Complete API reference for the VatValidation Ruby SDK.


## VatValidationSDK

### Constructor

```ruby
require_relative 'vat-validation_sdk'

client = VatValidationSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VatValidationSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = VatValidationSDK.test
```


### Instance Methods

#### `Country(data = nil)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Currency(data = nil)`

Create a new `Currency` entity instance. Pass `nil` for no initial data.

#### `Geolocate(data = nil)`

Create a new `Geolocate` entity instance. Pass `nil` for no initial data.

#### `Rate(data = nil)`

Create a new `Rate` entity instance. Pass `nil` for no initial data.

#### `ValidateIbanResponseSchema(data = nil)`

Create a new `ValidateIbanResponseSchema` entity instance. Pass `nil` for no initial data.

#### `ValidateVatResponseSchema(data = nil)`

Create a new `ValidateVatResponseSchema` entity instance. Pass `nil` for no initial data.

#### `VatcomplyApiRoot(data = nil)`

Create a new `VatcomplyApiRoot` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CountryEntity

```ruby
country = client.Country
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Country.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CurrencyEntity

```ruby
currency = client.Currency
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | Yes |  |
| `symbol` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Currency.load({ "id" => "currency_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GeolocateEntity

```ruby
geolocate = client.Geolocate
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Geolocate.load({ "id" => "geolocate_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GeolocateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RateEntity

```ruby
rate = client.Rate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Rate.load({ "id" => "rate_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ValidateIbanResponseSchemaEntity

```ruby
validate_iban_response_schema = client.ValidateIbanResponseSchema
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ValidateIbanResponseSchema.load({ "id" => "validate_iban_response_schema_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ValidateVatResponseSchemaEntity

```ruby
validate_vat_response_schema = client.ValidateVatResponseSchema
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ValidateVatResponseSchema.load({ "id" => "validate_vat_response_schema_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ValidateVatResponseSchemaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VatcomplyApiRootEntity

```ruby
vatcomply_api_root = client.VatcomplyApiRoot
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.VatcomplyApiRoot.load({ "id" => "vatcomply_api_root_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VatcomplyApiRootEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = VatValidationSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

