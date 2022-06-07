<?php

namespace Src\core\http\Route;

use Src\core\http\handler\RequestHandler;
use Src\core\http\handler\RequestHandlerInterface;
use Src\core\http\httpMessage\HttpRequest;
use Src\core\http\middlerware\MiddlewareAuthentication;
use Src\core\http\middlerware\MiddlewareController;
use Src\core\http\middlerware\MiddlewareHandleException;
use Src\core\http\middlerware\MiddlewareInterface;

require "../src/constants/Route.php";

class Route
{
    private $__routes;
    private $routingContext;
    private $handler;

    public function __construct()
    {
        $this->__routes = [];
        $this->routingContext = new RoutingContextImpl();
    }

    public function setRequest($httpMethod, string $url, $action, $isEnableAuthentication, $role = [])
    {
        $this->__request($httpMethod, $url, $action, $isEnableAuthentication, $role);
    }

    private function __request($httpMethod, string $url, $action, $isEnableAuthentication, $role = [])
    {
        $parts = parse_url($url);
        $route = [
            URL => $parts['path'],
            METHOD => $httpMethod,
            ACTION => $action,
            IS_ENABLE_AUTHENTICATION => $isEnableAuthentication,
            ROLE => $role,
        ];

        // Thêm route vào router.
        array_push($this->__routes, $route);
    }

    public function map(string $url, string $method)
    {
        foreach ($this->__routes as $route) {
            $parts = parse_url($url);
            if ($route[URL] == $parts['path']) {
                if ($route[METHOD] == $method) {

                    $query = null;
                    if ($method == GET && array_key_exists("query", $parts))
                        parse_str($parts['query'], $query);
                    $this->routingContext = $this->handler($route, $method, $url, $query);
                    return $this->routingContext->getResponse();
                } else if ($method == "OPTIONS") return;
            }
        }
        http_response_code(404);
        exit();
    }

    private function handler($route, $method, $url, $params = null): RoutingContextInterface
    {
        $this->routingContext = new RoutingContextImpl();
        $request = $this->setHttpRequest($method, $url, $params);
        $this->routingContext->setRequest($request);
        $this->routingContext->setRoute($route);
        $middlewares = array();
        if ($route[IS_ENABLE_AUTHENTICATION])
            array_push($middlewares, new MiddlewareAuthentication());
        array_push($middlewares, new MiddlewareController());
        $this->handler = new RequestHandler(new MiddlewareHandleException(), ...$middlewares);
        return $this->handler->handle($this->routingContext);
    }

    private function setHttpRequest($method, $url, $params): HttpRequest
    {
        $request = new HttpRequest();
        $request->setMethod($method);
        $request->setParams($params);
        $request->setUrl($url);
        $method_have_body = array(POST, PUT, DELETE);
        if (in_array($method, $method_have_body))
            if (file_get_contents('php://input') != null) {
                $request->setBody(get_object_vars(json_decode(file_get_contents('php://input'))));
            }
        return $request;
    }
}
