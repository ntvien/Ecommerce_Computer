<?php
namespace Src\core\http\HttpMessage;

interface HttpRequestInterface{
    public function getParams();
    public function getUrl();
    public function getMethod();
    public function getBody();
    public function setParams($params);
    public function setUrl($url);
    public function setMethod($method);
    public function setBody($body);

}