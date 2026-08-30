<?php

namespace App\Exceptions;

use Exception;

class ProductServiceUnavailableException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'error' => 'Product Service is currently unavailable. Please try again later.'
        ], 503);
    }
}
