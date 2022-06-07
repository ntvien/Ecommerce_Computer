<?php

namespace Src\core\http\Middlerware;

use Src\core\http\Exception\HttpException;
use Src\core\http\handler\RequestHandlerInterface;
use Src\core\http\httpMessage\HttpResponse;
use Src\core\http\Route\RoutingContextInterface;

class MiddlewareHandleException implements MiddlewareInterface
{

    public function process(RoutingContextInterface $routingContext, RequestHandlerInterface $handler): RoutingContextInterface
    {
            $throwable = $routingContext->getThrowable();
        $response = new HttpResponse();

            if($throwable instanceof HttpException){
                http_response_code($throwable->getStatusCode());
                $response->setStatusCode($throwable->getStatusCode());
            }else{
                http_response_code(500);
                http_response_code(500);
            }


        $response->setbody($throwable->getMessage());
        $routingContext->setResponse($response);
        return $routingContext;
    }
}