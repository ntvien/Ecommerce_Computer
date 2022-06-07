<?php

namespace Src\core\http\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Src\core\http\httpMessage\HttpResponseInterface;
use Src\core\http\middlerware\MiddlewareInterface;
use Src\core\http\Route\RoutingContextInterface;

/**
 * Handles a server request and produces a response.
 *
 * An HTTP request handler process an HTTP request in order to produce an
 * HTTP response.
 */
interface RequestHandlerInterface
{
    /**
     * Handles a request and produces a response.
     *
     * May call other collaborating code to generate the response.
     */
    public function handle(RoutingContextInterface $routingContext): RoutingContextInterface;
    public function handlerException(RoutingContextInterface  $routingContext):RoutingContextInterface;
    public function addMiddleware(MiddlewareInterface $middleware):RequestHandlerInterface;

}
