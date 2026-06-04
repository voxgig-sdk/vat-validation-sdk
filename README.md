# VatValidation SDK

Validate VAT numbers, look up IBANs, geolocate visitors, and fetch ECB exchange rates

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Vatcomply API

[VATComply](https://www.vatcomply.com) is a small public web service for VAT compliance work. It exposes a JSON HTTP API at `https://api.vatcomply.com` (version 1.0.0) covering VAT number validation, IBAN validation, country and currency reference data, IP geolocation, and currency exchange rates sourced from the European Central Bank.

What you get from the API:

- VAT number validation against EU registries.
- IBAN validation for international bank account numbers.
- Country and currency reference data lists.
- Geolocation of the caller's IP address.
- Current and historical exchange rates (ECB reference rates, with EUR as the default base and historical data reaching back to 1999).

The service is publicly reachable, returns JSON, and does not document an authentication scheme. Interactive documentation and the OpenAPI schema are available at `/docs` and `/docs/openapi.json`.

## Try it

**TypeScript**
```bash
npm install vat-validation
```

**Python**
```bash
pip install vat-validation-sdk
```

**PHP**
```bash
composer require voxgig/vat-validation-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/vat-validation-sdk/go
```

**Ruby**
```bash
gem install vat-validation-sdk
```

**Lua**
```bash
luarocks install vat-validation-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { VatValidationSDK } from 'vat-validation'

const client = new VatValidationSDK({})

// List all countrys
const countrys = await client.Country().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o vat-validation-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "vat-validation": {
      "command": "/abs/path/to/vat-validation-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Country** | Reference list of countries supported by the API, useful for cross-referencing VAT country codes. | `/countries` |
| **Currency** | Reference list of currencies supported for exchange-rate conversions. | `/currencies` |
| **Geolocate** | Geolocation of the caller's IP address, returning country and related metadata. | `/geolocate` |
| **Rate** | Current and historical currency exchange rates sourced from the European Central Bank, with optional base-currency selection. | `/rates` |
| **ValidateIbanResponseSchema** | Response shape for the IBAN validation endpoint, indicating whether a supplied IBAN is well-formed and parsed components. | `/iban` |
| **ValidateVatResponseSchema** | Response shape for the VAT number validation endpoint, indicating registration status and associated trader details where available. | `/vat` |
| **VatcomplyApiRoot** | Root endpoint of the VATComply API, describing the service and linking to the interactive docs at `/docs`. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from vatvalidation_sdk import VatValidationSDK

client = VatValidationSDK({})

# List all countrys
countrys, err = client.Country(None).list(None, None)
```

### PHP

```php
<?php
require_once 'vatvalidation_sdk.php';

$client = new VatValidationSDK([]);

// List all countrys
[$countrys, $err] = $client->Country(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/vat-validation-sdk/go"

client := sdk.NewVatValidationSDK(map[string]any{})

// List all countrys
countrys, err := client.Country(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "VatValidation_sdk"

client = VatValidationSDK.new({})

# List all countrys
countrys, err = client.Country(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("vat-validation_sdk")

local client = sdk.new({})

-- List all countrys
local countrys, err = client:Country(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = VatValidationSDK.test()
const result = await client.Country().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = VatValidationSDK.test(None, None)
result, err = client.Country(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = VatValidationSDK::test(null, null);
[$result, $err] = $client->Country(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Country(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = VatValidationSDK.test(nil, nil)
result, err = client.Country(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Country(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Vatcomply API

- Upstream: [https://www.vatcomply.com](https://www.vatcomply.com)
- API docs: [https://api.vatcomply.com/docs](https://api.vatcomply.com/docs)

- Project is distributed under the MIT License per slug metadata.
- The API is publicly accessible; no API key is documented.
- Exchange-rate data is derived from the European Central Bank (ECB) reference rates; check ECB's terms when redistributing.
- No rate limits, SLAs, or guarantees are documented in the public OpenAPI spec.

---

Generated from the Vatcomply API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
