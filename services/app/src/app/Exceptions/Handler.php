<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Exception | Throwable $exception)
    {
        if($exception instanceof NotFoundHttpException){
            return response()->json("Invalid endpoint.", 404);
        }
        return parent::render($request, $exception);
    }
}