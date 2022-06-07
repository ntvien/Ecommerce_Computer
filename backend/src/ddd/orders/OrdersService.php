<?php

namespace Src\ddd\orders;

use Src\core\http\Exception\HttpException;
use Src\ddd\user\repository\UserRepository;
use Src\util\jwt\JwtHandler;

class OrdersService
{
    private $ordersRepository;


    public function __construct($db)
    {
        $this->ordersRepository = new OrdersRepository($db);
    }
    public function getOrderOfUser($userId,$page, $size)
    {
        return $this->ordersRepository->getOrderOfUser($userId,$page, $size);
    }
    public function getOrderById($order)
    {
        return $this->ordersRepository->getOrderById($order);
    }

    public function getOrders($page, $size)
    {
        return $this->ordersRepository->getOrders($page,$size);
    }

    public function insertOrder($order)
    {
        try {

            return $this->ordersRepository->insertOrder($order);
        } catch (\PDOException $e) {
            throw new HttpException(500, INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteOrders($request)
    {

        foreach ($request['ids'] as $id) {
            $this->ordersRepository->deleteOrders($id);
        }
    }

    public function getCartOfUser($userId)
    {
        return $this->ordersRepository->getCartOfUser($userId);
    }

    public function insertCart($cart)
    {
        try {

           return $this->ordersRepository->insertCart($cart);
        } catch (\PDOException $e) {
            throw new HttpException(500, INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteCart($request)
    {

        foreach ($request['items'] as $item) {
            $item= json_decode(json_encode($item), true);
            $this->ordersRepository->deleteCart($item["user_id"],$item["product_id"]);
        }
    }



}