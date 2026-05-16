# VatValidation Python SDK Reference

Complete API reference for the VatValidation Python SDK.


## VatValidationSDK

### Constructor

```python
from vat-validation_sdk import VatValidationSDK

client = VatValidationSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## CountryEntity

```python
country = client.Country()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Country().list({})
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
| `name` | ``$STRING`` | Yes |  |
| `symbol` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Currency().load({"id": "currency_id"})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Geolocate().load({"id": "geolocate_id"})
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Rate().load({"id": "rate_id"})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ValidateIbanResponseSchema().load({"id": "validate_iban_response_schema_id"})
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | No |  |
| `valid` | ``$BOOLEAN`` | Yes |  |
| `vat_number` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ValidateVatResponseSchema().load({"id": "validate_vat_response_schema_id"})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.VatcomplyApiRoot().load({"id": "vatcomply_api_root_id"})
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

