<?php
namespace Src\core\http\Route;
use Src\authentication\UserAuth;
use Src\core\http\httpMessage\HttpRequest;
use Src\core\http\httpMessage\HttpResponse;

class RoutingContextImpl implements RoutingContextInterface{
    private  $request;
    private  $response;
    private  $user;
    private  $buffer =[];
    private  $route;
    private $throwable;

    /**
     * @return mixed
     */
    public function getThrowable()
    {
        return $this->throwable;
    }
    private $statusCode;
    public function put($key, $value)
    {
        $this->buffer[$key] = $value;
    }

    public function getRequest()
    {
        return $this->request;
    }

    public function setRequest($request)
    {
       $this->request= $request;
    }

    public function getResponse()
    {
        return $this->response;
    }

    public function setResponse($response)
    {
       $this->response = $response;
    }

    public function get($key)
    {
        return $this->buffer[$key];
    }

    public function setUser($user)
    {
       $this->user = $user;
    }

    public function getUser()
    {
       return $this->user;
    }

    public function getBodyAsJson()
    {
        // TODO: Implement getBodyAsJson() method.
    }

    public function setBody($body)
    {
        $this->body = $body;
    }

    public function fail( \Throwable $throwable)
    {
        $this->throwable = $throwable;
    }

    public function setRoute($route)
    {
        $this->route = $route;
    }

    public function getRoute()
    {
        return $this->route;
    }
}