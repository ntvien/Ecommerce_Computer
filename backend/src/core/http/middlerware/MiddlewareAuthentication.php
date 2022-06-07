<?php

namespace Src\core\http\middlerware;

use Src\core\http\Exception\HttpException;
use Src\core\http\handler\RequestHandlerInterface;
use Src\core\http\Route\RoutingContextInterface;
use Src\util\jwt\JwtHandler;

class MiddlewareAuthentication implements MiddlewareInterface
{
    private $jwt;

    /**
     * @param $jwt
     */
    public function __construct()
    {
        $this->jwt =JwtHandler::getInstance();
    }

    public function process(RoutingContextInterface $routingContext, RequestHandlerInterface $handler): RoutingContextInterface
    {
        $headers = apache_request_headers();
        if (!isset($headers['Authorization'])) {
            $routingContext->fail( new HttpException(401, UNAUTHORIZED));
            return $handler->handlerException($routingContext);
        }
        try {
            $token = $headers['Authorization'];
            $user = $this->jwt->jwt_bearer_decode_data($token);
            $routingContext->setUser($user);
        } catch (\Throwable $e) {
            throw new HttpException(401, BAD_TOKEN);
        }
        return $handler->handle($routingContext);
    }
}