# VatValidation Python SDK

The Python SDK for the VatValidation API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install vat-validation-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from vatvalidation_sdk import VatValidationSDK

client = VatValidationSDK({
    "apikey": os.environ.get("VAT-VALIDATION_APIKEY"),
})
```

### 2. List countrys

```python
result, err = client.Country(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = VatValidationSDK.test(None, None)

result, err = client.VatValidation(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = VatValidationSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VAT-VALIDATION_TEST_LIVE=TRUE
VAT-VALIDATION_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### VatValidationSDK

```python
from vatvalidation_sdk import VatValidationSDK

client = VatValidationSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = VatValidationSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### VatValidationSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const country = client.Country()`

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
const countrys = await client.Country().list()
```


### Currency

Create an instance: `const currency = client.Currency()`

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
const currency = await client.Currency().load({ id: 'currency_id' })
```


### Geolocate

Create an instance: `const geolocate = client.Geolocate()`

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
const geolocate = await client.Geolocate().load({ id: 'geolocate_id' })
```


### Rate

Create an instance: `const rate = client.Rate()`

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
const rate = await client.Rate().load({ id: 'rate_id' })
```


### ValidateIbanResponseSchema

Create an instance: `const validate_iban_response_schema = client.ValidateIbanResponseSchema()`

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
const validate_iban_response_schema = await client.ValidateIbanResponseSchema().load({ id: 'validate_iban_response_schema_id' })
```


### ValidateVatResponseSchema

Create an instance: `const validate_vat_response_schema = client.ValidateVatResponseSchema()`

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
const validate_vat_response_schema = await client.ValidateVatResponseSchema().load({ id: 'validate_vat_response_schema_id' })
```


### VatcomplyApiRoot

Create an instance: `const vatcomply_api_root = client.VatcomplyApiRoot()`

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
const vatcomply_api_root = await client.VatcomplyApiRoot().load({ id: 'vatcomply_api_root_id' })
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── vatvalidation_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`vatvalidation_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
