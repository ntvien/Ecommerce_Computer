<?php

namespace Src\controllers;

use Src\core\http\HttpMessage\HttpResponse;
use Src\core\http\Route\RoutingContextInterface;
use Src\ddd\community\CommunityService;
use Src\ddd\orders\OrdersService;
use Src\ddd\product\ProductService;
use Src\ddd\user\service\UserService;

class OrdersController
{
    private $ordersService;

    public function __construct($db)
    {

        $this->ordersService = new OrdersService($db);
    }

    public function getOrders(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $params = $routingContext->getRequest()->getParams();
        $user = $routingContext->getUser();
        $page = $params['page'];
        $size = $params['size'];
        if ($user["role"] == ADMIN) {
            $result = $this->ordersService->getOrders($page, $size);
            $response->setbody($result);
        } else {
            $userId = $user['user_id'];
            $result = $this->ordersService->getOrderOfUser($userId, $page, $size);
            $response->setbody($result);
        }
        $response->setStatusCode(200);
        $routingContext->setResponse($response);
    }

    public function insertOrder(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();

        $order = $this->ordersService->insertOrder($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($order);
        $routingContext->setResponse($response);


    }

    public function deleteOrders(RoutingContextInterface $routingContext)
    {
        $ids = $routingContext->getRequest()->getBody();
        $this->ordersService->deleteOrders($ids);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($ids);
        $routingContext->setResponse($response);
    }

    public function getCarts(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $user = $routingContext->getUser();
        $userResult = $this->ordersService->getCartOfUser($user["user_id"]);
        $response->setbody($userResult);

        $routingContext->setResponse($response);
    }

    public function insertCart(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();

        $user = $this->ordersService->insertCart($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($user);
        $routingContext->setResponse($response);


    }

    public function deleteCart(RoutingContextInterface $routingContext)
    {
        $ids = $routingContext->getRequest()->getBody();
        $this->ordersService->deleteCart($ids);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($ids);
        $routingContext->setResponse($response);
    }


}