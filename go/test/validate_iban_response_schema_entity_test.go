package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/vat-validation-sdk/go"
	"github.com/voxgig-sdk/vat-validation-sdk/go/core"

	vs "github.com/voxgig-sdk/vat-validation-sdk/go/utility/struct"
)

func TestValidateIbanResponseSchemaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ValidateIbanResponseSchema(nil)
		if ent == nil {
			t.Fatal("expected non-nil ValidateIbanResponseSchemaEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := validate_iban_response_schemaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "validate_iban_response_schema." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		validateIbanResponseSchemaRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.validate_iban_response_schema", setup.data)))
		var validateIbanResponseSchemaRef01Data map[string]any
		if len(validateIbanResponseSchemaRef01DataRaw) > 0 {
			validateIbanResponseSchemaRef01Data = core.ToMapAny(validateIbanResponseSchemaRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = validateIbanResponseSchemaRef01Data

		// LOAD
		validateIbanResponseSchemaRef01Ent := client.ValidateIbanResponseSchema(nil)
		validateIbanResponseSchemaRef01MatchDt0 := map[string]any{}
		validateIbanResponseSchemaRef01DataDt0Loaded, err := validateIbanResponseSchemaRef01Ent.Load(validateIbanResponseSchemaRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if validateIbanResponseSchemaRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func validate_iban_response_schemaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "validate_iban_response_schema", "ValidateIbanResponseSchemaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read validate_iban_response_schema test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse validate_iban_response_schema test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"validate_iban_response_schema01", "validate_iban_response_schema02", "validate_iban_response_schema03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID": idmap,
		"VAT_VALIDATION_TEST_LIVE":      "FALSE",
		"VAT_VALIDATION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["VAT_VALIDATION_TEST_VALIDATE_IBAN_RESPONSE_SCHEMA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["VAT_VALIDATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewVatValidationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["VAT_VALIDATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["VAT_VALIDATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
