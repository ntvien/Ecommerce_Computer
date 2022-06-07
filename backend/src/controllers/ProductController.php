<?php

namespace Src\controllers;

use Src\core\http\HttpMessage\HttpResponse;
use Src\core\http\Route\RoutingContextInterface;
use Src\ddd\community\CommunityService;
use Src\ddd\product\ProductService;
use Src\ddd\user\service\UserService;

class ProductController
{
    private $productService;

    public function __construct($db)
    {
        $this->productService = new ProductService($db);
    }

    public function getProducts(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $params = $routingContext->getRequest()->getParams();

        if (array_key_exists("product_id", $params)) {
            $id = $params['product_id'];
            $response->setbody($this->productService->getProductById($id));
        } else {
            $page = $params['page'];
            $size = $params['size'];
            $type = array_key_exists("type_of_product", $params) ? $params["type_of_product"] : [];
            $brand_name = array_key_exists("brand_name", $params) ? $params["brand_name"] : [];
            $min_price = array_key_exists("min_price", $params) ? $params["min_price"] : 0;
            $max_price = array_key_exists("max_price", $params) ? $params["max_price"] : INFO_ALL;
            $sort_by = array_key_exists("sort_by", $params) ? $params["sort_by"] : "price";
            $type_sort = array_key_exists("type_sort", $params) ? $params["type_sort"] : "DESC";
            $response->setbody($this->productService->getProducts($page, $size, $type, $brand_name, $min_price, $max_price, $sort_by, $type_sort));
        }
        $routingContext->setResponse($response);
    }

    public function getProductNames(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($this->productService->getProductNames());

        $routingContext->setResponse($response);
    }

    public function addProduct(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();

        $user = $this->productService->addProduct($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($user);
        $routingContext->setResponse($response);


    }

    public function UpdateProduct(RoutingContextInterface $routingContext)
    {
        $request = $routingContext->getRequest()->getBody();
        $userResult = $this->productService->UpdateProduct($request);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($userResult);
        $routingContext->setResponse($response);
    }

    public function DeleteProducts(RoutingContextInterface $routingContext)
    {
        $ids = $routingContext->getRequest()->getBody();
        $this->productService->DeleteProducts($ids);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($ids);
        $routingContext->setResponse($response);
    }

    ##brand

    public function getBrand(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $params = $routingContext->getRequest()->getParams();
        $userResult = $this->productService->getBrands();
        $response->setbody($userResult);

        $routingContext->setResponse($response);
    }

    public function addBrand(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();

        $user = $this->productService->addBrand($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($user);
        $routingContext->setResponse($response);


    }
}