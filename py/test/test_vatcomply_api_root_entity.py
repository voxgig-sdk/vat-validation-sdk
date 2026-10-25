# VatcomplyApiRoot entity test

import json
import os
import time

import pytest

from vatvalidation_sdk.utility.voxgig_struct import voxgig_struct as vs
from vatvalidation_sdk import VatValidationSDK
from vatvalidation_sdk.core import helpers
from vatvalidation_sdk.config import shared_config
from vatvalidation_sdk.feature.base_feature import VatValidationBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestVatcomplyApiRootEntity:

    def test_should_create_instance(self):
        testsdk = VatValidationSDK.test(None, None)
        ent = testsdk.VatcomplyApiRoot(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = VatValidationSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.VatcomplyApiRoot(None).load({"contact": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _vatcomply_api_root_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "vatcomply_api_root." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        vatcomply_api_root_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.vatcomply_api_root")))
        vatcomply_api_root_ref01_data = None
        if len(vatcomply_api_root_ref01_data_raw) > 0:
            vatcomply_api_root_ref01_data = helpers.to_map(vatcomply_api_root_ref01_data_raw[0][1])

        # LOAD
        vatcomply_api_root_ref01_ent = client.VatcomplyApiRoot(None)
        vatcomply_api_root_ref01_match_dt0 = {}
        vatcomply_api_root_ref01_data_dt0_loaded = vatcomply_api_root_ref01_ent.load(vatcomply_api_root_ref01_match_dt0, None)
        assert vatcomply_api_root_ref01_data_dt0_loaded is not None



def _vatcomply_api_root_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/vatcomply_api_root/VatcomplyApiRootTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = VatValidationSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["vatcomply_api_root01", "vatcomply_api_root02", "vatcomply_api_root03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID": idmap,
        "VAT_VALIDATION_TEST_LIVE": "FALSE",
        "VAT_VALIDATION_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("VAT_VALIDATION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = VatValidationSDK(helpers.to_map(merged_opts))

    _live = env.get("VAT_VALIDATION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("VAT_VALIDATION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
