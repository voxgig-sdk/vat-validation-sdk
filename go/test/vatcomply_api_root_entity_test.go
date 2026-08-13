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

func TestVatcomplyApiRootEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VatcomplyApiRoot(nil)
		if ent == nil {
			t.Fatal("expected non-nil VatcomplyApiRootEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := vatcomply_api_rootBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "vatcomply_api_root." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		vatcomplyApiRootRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.vatcomply_api_root", setup.data)))
		var vatcomplyApiRootRef01Data map[string]any
		if len(vatcomplyApiRootRef01DataRaw) > 0 {
			vatcomplyApiRootRef01Data = core.ToMapAny(vatcomplyApiRootRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = vatcomplyApiRootRef01Data

		// LOAD
		vatcomplyApiRootRef01Ent := client.VatcomplyApiRoot(nil)
		vatcomplyApiRootRef01MatchDt0 := map[string]any{}
		vatcomplyApiRootRef01DataDt0Loaded, err := vatcomplyApiRootRef01Ent.Load(vatcomplyApiRootRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if vatcomplyApiRootRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func vatcomply_api_rootBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "vatcomply_api_root", "VatcomplyApiRootTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read vatcomply_api_root test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse vatcomply_api_root test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"vatcomply_api_root01", "vatcomply_api_root02", "vatcomply_api_root03"},
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
	entidEnvRaw := os.Getenv("VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID": idmap,
		"VAT_VALIDATION_TEST_LIVE":      "FALSE",
		"VAT_VALIDATION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID"])
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
