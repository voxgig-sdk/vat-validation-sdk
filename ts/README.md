# VatValidation TypeScript SDK

The TypeScript SDK for the VatValidation API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install vat-validation
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { VatValidationSDK } from 'vat-validation'

const client = new VatValidationSDK({})
```

### 2. List countrys

```ts
const result = await client.Country().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = VatValidationSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new VatValidationSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new VatValidationSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VAT-VALIDATION_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### VatValidationSDK

#### Constructor

```ts
new VatValidationSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Country(data?)` | `CountryEntity` | Create a Country entity instance. |
| `Currency(data?)` | `CurrencyEntity` | Create a Currency entity instance. |
| `Geolocate(data?)` | `GeolocateEntity` | Create a Geolocate entity instance. |
| `Rate(data?)` | `RateEntity` | Create a Rate entity instance. |
| `ValidateIbanResponseSchema(data?)` | `ValidateIbanResponseSchemaEntity` | Create a ValidateIbanResponseSchema entity instance. |
| `ValidateVatResponseSchema(data?)` | `ValidateVatResponseSchemaEntity` | Create a ValidateVatResponseSchema entity instance. |
| `VatcomplyApiRoot(data?)` | `VatcomplyApiRootEntity` | Create a VatcomplyApiRoot entity instance. |
| `tester(testopts?, sdkopts?)` | `VatValidationSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `VatValidationSDK.test(testopts?, sdkopts?)` | `VatValidationSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): VatValidationSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

API path: `/countries`

#### Currency

| Field | Description |
| --- | --- |
| `name` |  |
| `symbol` |  |

Operations: load.

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

Operations: load.

API path: `/geolocate`

#### Rate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |

Operations: load.

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

Operations: load.

API path: `/iban`

#### ValidateVatResponseSchema

| Field | Description |
| --- | --- |
| `address` |  |
| `country_code` |  |
| `name` |  |
| `valid` |  |
| `vat_number` |  |

Operations: load.

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

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
vat-validation/
├── src/
│   ├── VatValidationSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { VatValidationSDK } from 'vat-validation'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
