<?php

namespace Src\ddd\user\service;

use Src\core\http\Exception\HttpException;
use Src\ddd\user\repository\UserRepository;
use Src\util\CheckField;
use Src\util\jwt\JwtHandler;

class UserService
{
    private $userRepository;
    private $jwt;

    /**
     * @param $userRepository
     */
    public function __construct($db)
    {
        $this->userRepository = new UserRepository($db);
        $this->jwt = JwtHandler::getInstance();
    }

    public function getUserById($userId)
    {
        return $this->userRepository->getUserById($userId);
    }

    public function getUsers($page, $size)
    {
        return $this->userRepository->getUsers($page, $size);
    }
    public function createUser($user)
    {
        try {
            if (CheckField::array_Any_key_Not_exists($user, "password", "user_name", "email")) {
                throw new HttpException(400, Miss_PARAM);
            }
            $check = $this->userRepository->checkUserByName($user['user_name']);
            if ($check) {
                throw new HttpException(409, USERNAME_EXIST);
            }
            $this->userRepository->insert($user, $user['role']);
            return $this->userRepository->getUserByUserName($user['user_name']);
        } catch (\PDOException $e) {
            throw new HttpException(400, USERNAME_PASSWORD_INVALID);
        }
    }

    public function register($user)
    {
        $user["role"] = "customer";
        return $this->createUser($user);
    }

    public function login($user)
    {
        try {
            if (CheckField::array_Any_key_Not_exists($user, "password", "user_name")) {
                throw new HttpException(404, Miss_PARAM);
            }
            $userResult = $this->userRepository->getUserByUserName($user['user_name']);
            if (!$userResult) {
                throw new HttpException(401, NONEXISTENT_USER);
            }
           
            if ($userResult->getPassword() != $user['password']) {
                throw new HttpException(401, WRONG_PASSWORD);
            }
            $token = $this->jwt->_jwt_encode_data($userResult->getUserId(), $userResult->getRole(), 24 * 3600 * 30);
            $refreshToken = $this->jwt->_jwt_encode_data($userResult->getUserId(), $userResult->getRole(), 24 * 3600 * 30 * 2);
            return [
                'token' => $token,
                'refreshToken' => $refreshToken
            ];
        } catch (\PDOException $e) {
            throw new HttpException(500, INTERNAL_SERVER_ERROR);
        }
    }

    public function refreshToken($token)
    {
        if (array_key_exists("refreshToken", $token)) {
            $data = $this->jwt->_jwt_decode_data($token['refreshToken']);
            $refreshToken = $this->jwt->_jwt_encode_data($data["userId"], $data["role"], 24 * 3600 * 30 * 2);
            $token = $this->jwt->_jwt_encode_data($data["userId"], $data["role"], 24 * 3600 * 30);
            return [
                'token' => $token,
                'refreshToken' => $refreshToken
            ];
        } else {
            throw new HttpException(404, Miss_PARAM);
        }
    }

    public function updateUser($userRequest)
    {
        if (CheckField::array_Any_key_Not_exists($userRequest, "last_name", "first_name", "email", "address", "phone_number", "avatar_url")) {
            throw new HttpException(404, Miss_PARAM);
        }
        return $this->userRepository->update($userRequest);
    }
    public function delete($userIds)
    {
        if (CheckField::array_Any_key_Not_exists($userIds, "user_ids")) {
            throw new HttpException(404, Miss_PARAM);
        }
        foreach ($userIds['user_ids'] as $userId) {
            $this->userRepository->delete($userId);
        }
    }

    public function changePassword($user, $passwordRequest)
    {
        if (CheckField::array_Any_key_Not_exists($passwordRequest, "old_password", "new_password")) {
            throw new HttpException(404, Miss_PARAM);
        }
        if (!$this->userRepository->checkUserIdPassword($user["user_id"], $passwordRequest['old_password'])) {
            throw new HttpException(401, WRONG_PASSWORD);
        }
        $this->userRepository->ChangePassword($user["user_id"], $passwordRequest['new_password']);
    }
}
