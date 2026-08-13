# VatValidation Python SDK Reference

Complete API reference for the VatValidation Python SDK.


## VatValidationSDK

### Constructor

```python
from vatvalidation_sdk import VatValidationSDK

client = VatValidationSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VatValidationSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = VatValidationSDK.test()
```


### Instance Methods

#### `Country(data=None)`

Create a new `CountryEntity` instance. Pass `None` for no initial data.

#### `Currency(data=None)`

Create a new `CurrencyEntity` instance. Pass `None` for no initial data.

#### `Geolocate(data=None)`

Create a new `GeolocateEntity` instance. Pass `None` for no initial data.

#### `Rate(data=None)`

Create a new `RateEntity` instance. Pass `None` for no initial data.

#### `ValidateIbanResponseSchema(data=None)`

Create a new `ValidateIbanResponseSchemaEntity` instance. Pass `None` for no initial data.

#### `ValidateVatResponseSchema(data=None)`

Create a new `ValidateVatResponseSchemaEntity` instance. Pass `None` for no initial data.

#### `VatcomplyApiRoot(data=None)`

Create a new `VatcomplyApiRootEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CountryEntity

```python
country = client.Country()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `str` | Yes |  |
| `currency` | `str` | Yes |  |
| `emoji` | `str` | Yes |  |
| `iso2` | `str` | Yes |  |
| `iso3` | `str` | Yes |  |
| `latitude` | `float` | Yes |  |
| `longitude` | `float` | Yes |  |
| `name` | `str` | Yes |  |
| `numeric_code` | `int` | Yes |  |
| `phone_code` | `str` | Yes |  |
| `region` | `str` | Yes |  |
| `subregion` | `str` | Yes |  |
| `tld` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Country().list()
for country in results:
    print(country)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyEntity

```python
currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | Yes |  |
| `symbol` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Currency().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GeolocateEntity

```python
geolocate = client.Geolocate()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Geolocate().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeolocateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RateEntity

```python
rate = client.Rate()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Rate().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ValidateIbanResponseSchemaEntity

```python
validate_iban_response_schema = client.ValidateIbanResponseSchema()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `str` | Yes |  |
| `bank_code` | `str` | Yes |  |
| `bank_name` | `str` | Yes |  |
| `bban` | `str` | Yes |  |
| `bic` | `str` | Yes |  |
| `branch_code` | `str` | Yes |  |
| `checksum_digits` | `str` | Yes |  |
| `country_code` | `str` | Yes |  |
| `country_name` | `str` | Yes |  |
| `iban` | `str` | Yes |  |
| `in_sepa_zone` | `bool` | Yes |  |
| `valid` | `bool` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ValidateIbanResponseSchema().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ValidateVatResponseSchemaEntity

```python
validate_vat_response_schema = client.ValidateVatResponseSchema()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ValidateVatResponseSchema().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ValidateVatResponseSchemaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VatcomplyApiRootEntity

```python
vatcomply_api_root = client.VatcomplyApiRoot()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VatcomplyApiRoot().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VatcomplyApiRootEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = VatValidationSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

