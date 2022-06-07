<?php
namespace Src\core\http\HttpMessage;
use Src\core\http\httpMessage\HttpResponseInterface;

require "../bootstrap.php";
class HttpResponse implements HttpResponseInterface,\JsonSerializable {
    private $body;
    public function setStatusCode($status)
    {
        http_response_code($status);
    }
    public function setbody($body)
    {
        $this->body = $body;
    }

    public function getBody()
    {
        return $this->body;
    }

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
}