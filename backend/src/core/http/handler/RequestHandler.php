<?php

namespace Src\core\http\Handler;

use Src\core\http\httpMessage\HttpResponseInterface;
use Src\core\http\middlerware\MiddlewareInterface;
use Src\core\http\Route\RoutingContextInterface;

class RequestHandler implements RequestHandlerInterface
{
    /**
     * @var MiddlewareInterface[]
     */
    protected $middlewares = [];
    protected $middlewareException;

    protected $routingContext;

    public function __construct(MiddlewareInterface $middlewareException, MiddlewareInterface ...$middlewares)
    {
        $this->middlewares = $middlewares;
        $this->middlewareException = $middlewareException;
    }

    private function withoutMiddleware(MiddlewareInterface $middleware): RequestHandlerInterface
    {
        return new self(
            $this->middlewareException,
            ...array_filter(
                $this->middlewares,
                function ($m) use ($middleware) {
                    return $middleware !== $m;
                }
            )
        );
    }

    public function handle(RoutingContextInterface $routingContext): RoutingContextInterface
    {
        $middleware = $this->middlewares[0] ?? false;

        return $middleware
            ? $middleware->process(
                $routingContext,
                $this->withoutMiddleware($middleware)
            )
            : $routingContext;
    }

    public function handlerException(RoutingContextInterface $routingContext): RoutingContextInterface
    {
        return $this->middlewareException ? $this->middlewareException->process(
            $routingContext,
            $this
        ) : $routingContext;
    }

    public function addMiddleware(MiddlewareInterface $middleware): RequestHandlerInterface
    {
        array_push($this->middlewares,$middleware);
        return $this;
    }
}