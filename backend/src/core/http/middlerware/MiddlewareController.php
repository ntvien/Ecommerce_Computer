<?php
namespace Src\core\http\Middlerware;
use Src\core\http\Exception\HttpException;
use Src\core\http\handler\RequestHandlerInterface;
use Src\core\http\Route\RoutingContextInterface;
use Src\mysqldb\Database;

class MiddlewareController implements MiddlewareInterface{
    public function process(RoutingContextInterface $routingContext, RequestHandlerInterface $handler): RoutingContextInterface
    {
        try {
            $action = $routingContext->getRoute()[ACTION];
            if (is_callable($action)) {
                call_user_func_array($action, [$routingContext]);
            }
            if (is_string($action)) {
                $action = explode('@', $action);
                $controller_name = 'Src\\Controllers\\' . $action[0];
                $dbConnection = (new Database())->getConnection();
                $controller = new $controller_name($dbConnection);
                call_user_func_array([$controller, $action[1]], [$routingContext]);
            }
        }catch (HttpException $e){
            $routingContext->fail($e);
            return $handler->handlerException($routingContext);
        }catch (\Exception $e){
            $routingContext->fail(new HttpException(500,INTERNAL_SERVER_ERROR));
            return $handler->handlerException($routingContext);
        }
        return $handler->handle($routingContext);
    }
}