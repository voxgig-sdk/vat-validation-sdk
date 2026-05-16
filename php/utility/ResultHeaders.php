<?php
declare(strict_types=1);

// VatValidation SDK utility: result_headers

class VatValidationResultHeaders
{
    public static function call(VatValidationContext $ctx): ?VatValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
