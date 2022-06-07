<?php

namespace Src\Controllers;

use phpDocumentor\Reflection\DocBlock\Tags\Throws;
use Src\core\http\Exception\HttpException;
use Src\core\http\httpMessage\HttpResponse;
use Src\core\http\Route\RoutingContextInterface;
use Src\ddd\user\service\UserService;

class UserController
{
    private $userService;

    /**
     * @param $userService
     */
    public function __construct($db)
    {
        $this->userService = new UserService($db);
    }

    public function getUserInfo(RoutingContextInterface $routingContext)
    {
        $user = $routingContext->getUser();
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $userResult = $this->userService->getUserById($user["user_id"]);
        $response->setbody($userResult);

        $routingContext->setResponse($response);
    }

    public function getUsers(RoutingContextInterface $routingContext)
    {
        $user = $routingContext->getUser();
        $response = new HttpResponse();
        $response->setStatusCode(200);
        if ($user["role"] == ADMIN) {
            $params = $routingContext->getRequest()->getParams();
            $page = $params['page'];
            $size = $params['size'];
            $userResult = $this->userService->getUsers($page, $size);
            $response->setbody($userResult);
        } else {
            throw new HttpException(401, FORBIDDEN);
        }


        $routingContext->setResponse($response);
    }

    public function update(RoutingContextInterface $routingContext)
    {
        $user = $routingContext->getUser();
        $userRequest = $routingContext->getRequest()->getBody();
        $userRequest["user_id"] = $user["user_id"];
        $userResult = $this->userService->updateUser($userRequest);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($userResult);
        $routingContext->setResponse($response);
    }

    public function updateInAdmin(RoutingContextInterface $routingContext)
    {
        $user = $routingContext->getUser();
        $userRequest = $routingContext->getRequest()->getBody();
        if ($user["role"] == ADMIN) {
            $userResult = $this->userService->updateUser($userRequest);
            $response = new HttpResponse();
            $response->setStatusCode(200);
            $response->setbody($userResult);
            $routingContext->setResponse($response);
        } else {
            throw new HttpException(401, FORBIDDEN);
        }
    }

    public function delete(RoutingContextInterface $routingContext)
    {
        $userids = $routingContext->getRequest()->getBody();
        $this->userService->delete($userids);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($userids);
        $routingContext->setResponse($response);
    }

    public function changePassword(RoutingContextInterface $routingContext)
    {
        $passwordRequest = $routingContext->getRequest()->getBody();
        $user = $routingContext->getUser();
        $this->userService->changePassword($user, $passwordRequest);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody(true);
        $routingContext->setResponse($response);
    }


    public function login(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();
        $token = $this->userService->login($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($token);
        $routingContext->setResponse($response);

    }

    public function register(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();
        $user = $this->userService->register($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($user);
        $routingContext->setResponse($response);
    }

    public function create(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $user = $this->userService->createUser($body);
        $response->setbody($user);
        $routingContext->setResponse($response);
    }

    public function refreshToken(RoutingContextInterface $routingContext)
    {
        $body = $routingContext->getRequest()->getBody();
        $token = $this->userService->refreshToken($body);
        $response = new HttpResponse();
        $response->setStatusCode(200);
        $response->setbody($token);
        $routingContext->setResponse($response);

    }
}
