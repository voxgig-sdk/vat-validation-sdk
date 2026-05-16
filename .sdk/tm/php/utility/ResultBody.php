<?php
declare(strict_types=1);

// VatValidation SDK utility: result_body

class VatValidationResultBody
{
    public static function call(VatValidationContext $ctx): ?VatValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
