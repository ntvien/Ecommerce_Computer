<?php
namespace Src\core\http\HttpMessage;

interface HttpResponseInterface{
    public function setStatusCode($status);
    public function setBody($body);
    public function getBody();
}