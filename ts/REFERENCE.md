# VatValidation TypeScript SDK Reference

Complete API reference for the VatValidation TypeScript SDK.


## VatValidationSDK

### Constructor

```ts
new VatValidationSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VatValidationSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = VatValidationSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `VatValidationSDK` instance in test mode.


### Instance Methods

#### `Country(data?: object)`

Create a new `Country` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CountryEntity` instance.

#### `Currency(data?: object)`

Create a new `Currency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CurrencyEntity` instance.

#### `Geolocate(data?: object)`

Create a new `Geolocate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GeolocateEntity` instance.

#### `Rate(data?: object)`

Create a new `Rate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RateEntity` instance.

#### `ValidateIbanResponseSchema(data?: object)`

Create a new `ValidateIbanResponseSchema` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ValidateIbanResponseSchemaEntity` instance.

#### `ValidateVatResponseSchema(data?: object)`

Create a new `ValidateVatResponseSchema` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ValidateVatResponseSchemaEntity` instance.

#### `VatcomplyApiRoot(data?: object)`

Create a new `VatcomplyApiRoot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VatcomplyApiRootEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `VatValidationSDK.test()`.

**Returns:** `VatValidationSDK` instance in test mode.


---

## CountryEntity

```ts
const country = client.country
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.country.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CurrencyEntity

```ts
const currency = client.currency
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | Yes |  |
| `symbol` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.currency.load({ id: 'currency_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GeolocateEntity

```ts
const geolocate = client.geolocate
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.geolocate.load({ id: 'geolocate_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GeolocateEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RateEntity

```ts
const rate = client.rate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.rate.load({ id: 'rate_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RateEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ValidateIbanResponseSchemaEntity

```ts
const validate_iban_response_schema = client.validate_iban_response_schema
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.validate_iban_response_schema.load({ id: 'validate_iban_response_schema_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ValidateIbanResponseSchemaEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ValidateVatResponseSchemaEntity

```ts
const validate_vat_response_schema = client.validate_vat_response_schema
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.validate_vat_response_schema.load({ id: 'validate_vat_response_schema_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ValidateVatResponseSchemaEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VatcomplyApiRootEntity

```ts
const vatcomply_api_root = client.vatcomply_api_root
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.vatcomply_api_root.load({ id: 'vatcomply_api_root_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VatcomplyApiRootEntity` instance with the same client and
options.

#### `client()`

Return the parent `VatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new VatValidationSDK({
  feature: {
    test: { active: true },
  }
})
```

