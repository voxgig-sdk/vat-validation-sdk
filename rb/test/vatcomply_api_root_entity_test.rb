# VatcomplyApiRoot entity test

require "minitest/autorun"
require "json"
require_relative "../VatValidation_sdk"
require_relative "runner"

class VatcomplyApiRootEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = VatValidationSDK.test(nil, nil)
    ent = testsdk.VatcomplyApiRoot(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = VatValidationConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = VatValidationSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.VatcomplyApiRoot(nil).load({ "contact" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = vatcomply_api_root_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "vatcomply_api_root." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    vatcomply_api_root_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.vatcomply_api_root")))
    vatcomply_api_root_ref01_data = nil
    if vatcomply_api_root_ref01_data_raw.length > 0
      vatcomply_api_root_ref01_data = Helpers.to_map(vatcomply_api_root_ref01_data_raw[0][1])
    end

    # LOAD
    vatcomply_api_root_ref01_ent = client.VatcomplyApiRoot(nil)
    vatcomply_api_root_ref01_match_dt0 = {}
    vatcomply_api_root_ref01_data_dt0_loaded = vatcomply_api_root_ref01_ent.load(vatcomply_api_root_ref01_match_dt0, nil)
    assert !vatcomply_api_root_ref01_data_dt0_loaded.nil?

  end
end

def vatcomply_api_root_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "vatcomply_api_root", "VatcomplyApiRootTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = VatValidationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["vatcomply_api_root01", "vatcomply_api_root02", "vatcomply_api_root03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID" => idmap,
    "VAT_VALIDATION_TEST_LIVE" => "FALSE",
    "VAT_VALIDATION_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["VAT_VALIDATION_TEST_VATCOMPLY_API_ROOT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["VAT_VALIDATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = VatValidationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["VAT_VALIDATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["VAT_VALIDATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
