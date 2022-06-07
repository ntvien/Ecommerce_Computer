<?php
namespace Src\core\http\Route;
interface RoutingContextInterface{
    public function put($key, $value);
    public function getRequest();
    public function setRequest($request);
    public function getResponse();
    public function setResponse($response);
    public function get($key);
    public function setUser($user);
    public function getUser();
    public function getBodyAsJson();
    public function setBody($body);
    public function fail(\Throwable $throwable);
    public function setRoute($route);
    public function getRoute();
    public function getThrowable();
}