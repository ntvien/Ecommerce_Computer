<?php

namespace Src\core\http\Exception;


use Exception;
use Throwable;

class HttpException extends Exception
{
    private $statusCode;

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function __construct($statusCode, $message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->statusCode = $statusCode;

    }
}