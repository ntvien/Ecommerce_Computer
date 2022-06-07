<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Credentials: f");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require "../bootstrap.php";
require "../src/constants/MessageHttpException.php";
require "../src/constants/Role.php";
include_once "../src/util/log.php";

use Src\Controller\UserController;

$router = new Src\core\http\Route\Route();
require "../src/route/routes.php";
$request_url = $_SERVER['REQUEST_URI'];
$method_url = !empty($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
if ($_SERVER['REQUEST_METHOD'] != OPTIONS) {
    $result = $router->map($request_url, $method_url);
    echo json_encode($result->getBody());
} else {
    http_response_code(200);
}
//var_dump($request_url);