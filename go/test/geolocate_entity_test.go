package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/vat-validation-sdk"
	"github.com/voxgig-sdk/vat-validation-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGeolocateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Geolocate(nil)
		if ent == nil {
			t.Fatal("expected non-nil GeolocateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := geolocateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "geolocate." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set VATVALIDATION_TEST_GEOLOCATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		geolocateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.geolocate", setup.data)))
		var geolocateRef01Data map[string]any
		if len(geolocateRef01DataRaw) > 0 {
			geolocateRef01Data = core.ToMapAny(geolocateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = geolocateRef01Data

		// LOAD
		geolocateRef01Ent := client.Geolocate(nil)
		geolocateRef01MatchDt0 := map[string]any{}
		geolocateRef01DataDt0Loaded, err := geolocateRef01Ent.Load(geolocateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if geolocateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func geolocateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "geolocate", "GeolocateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read geolocate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse geolocate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"geolocate01", "geolocate02", "geolocate03"},
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
	entidEnvRaw := os.Getenv("VATVALIDATION_TEST_GEOLOCATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VATVALIDATION_TEST_GEOLOCATE_ENTID": idmap,
		"VATVALIDATION_TEST_LIVE":      "FALSE",
		"VATVALIDATION_TEST_EXPLAIN":   "FALSE",
		"VATVALIDATION_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["VATVALIDATION_TEST_GEOLOCATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["VATVALIDATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["VATVALIDATION_APIKEY"],
			},
			extra,
		})
		client = sdk.NewVatValidationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["VATVALIDATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["VATVALIDATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
