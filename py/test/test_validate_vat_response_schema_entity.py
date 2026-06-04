# ValidateVatResponseSchema entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from vatvalidation_sdk import VatValidationSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestValidateVatResponseSchemaEntity:

    def test_should_create_instance(self):
        testsdk = VatValidationSDK.test(None, None)
        ent = testsdk.ValidateVatResponseSchema(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _validate_vat_response_schema_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "validate_vat_response_schema." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set VATVALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        validate_vat_response_schema_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.validate_vat_response_schema")))
        validate_vat_response_schema_ref01_data = None
        if len(validate_vat_response_schema_ref01_data_raw) > 0:
            validate_vat_response_schema_ref01_data = helpers.to_map(validate_vat_response_schema_ref01_data_raw[0][1])

        # LOAD
        validate_vat_response_schema_ref01_ent = client.ValidateVatResponseSchema(None)
        validate_vat_response_schema_ref01_match_dt0 = {}
        validate_vat_response_schema_ref01_data_dt0_loaded, err = validate_vat_response_schema_ref01_ent.load(validate_vat_response_schema_ref01_match_dt0, None)
        assert err is None
        assert validate_vat_response_schema_ref01_data_dt0_loaded is not None



def _validate_vat_response_schema_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/validate_vat_response_schema/ValidateVatResponseSchemaTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = VatValidationSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["validate_vat_response_schema01", "validate_vat_response_schema02", "validate_vat_response_schema03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "VATVALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "VATVALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID": idmap,
        "VATVALIDATION_TEST_LIVE": "FALSE",
        "VATVALIDATION_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("VATVALIDATION_TEST_VALIDATE_VAT_RESPONSE_SCHEMA_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("VATVALIDATION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = VatValidationSDK(helpers.to_map(merged_opts))

    _live = env.get("VATVALIDATION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("VATVALIDATION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
