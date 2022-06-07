<?php

namespace Src\controllers;

use Src\core\http\HttpMessage\HttpResponse;
use Src\core\http\Route\RoutingContextInterface;
use Src\ddd\community\CommunityService;
use Src\ddd\product\ProductService;
use Src\ddd\user\service\UserService;

class CommunityController
{
    private $communityService;
    public function __construct($db)
    {
        $this->communityService = new CommunityService($db);
    }
    public function getReviews(RoutingContextInterface $routingContext)
    {
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $params = $routingContext->getRequest()->getParams();
        $page = 0;
        $size = 20;
        if (isset($params['page']))
            $page = $params['page'];
        if (isset($params['size']))
            $size = $params['size'];
        $sort_by = array_key_exists("sort_by", $params) ? $params["sort_by"] : "created_time";

        if (array_key_exists("product_id", $params)) {
            $productId = $params['product_id'];
            $userResult = $this->communityService->getReviewsByProduct($productId, $page, $size, $sort_by);
        } else {
            $userResult = $this->communityService->getReviews($page, $size, $sort_by);
        }
        $response->setbody($userResult);

        $routingContext->setResponse($response);
    }
    public function insertReview(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();
        $body["user_id"] = $routingContext->getUser()["user_id"];
        $response = $this->communityService->insertReview($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $routingContext->setResponse($response);
    }

    public function deleteReviews(RoutingContextInterface $routingContext)
    {
        $ids = $routingContext->getRequest()->getBody();
        $this->communityService->deleteReviews($ids);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($ids);
        $routingContext->setResponse($response);
    }
}
