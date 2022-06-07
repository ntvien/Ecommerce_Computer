<?php

namespace Src\ddd\user\repository;

use Src\ddd\user\User;

class UserRepository
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getUserById($userId)
    {
        $query = "select user.user_id, last_name, first_name, user_name, email, address, phone_number, avatar_url, role_name
                    from user,role_of_user,role
                    where user.user_id =? and user.user_id =role_of_user.user_id
                        and role.role_id =role_of_user.role_id;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->setFetchMode(\PDO::FETCH_CLASS, User::class);
            $sth->execute([$userId]);
            return $sth->fetch();
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getUsers($page, $size)
    {
        $offset = $size * $page;
        $query = "select user.user_id,user.password, last_name, first_name, user_name, email, address, phone_number, avatar_url, role_name
                    from user,role_of_user,role
                    where user.user_id = role_of_user.user_id and role_of_user.role_id = role.role_id
                    group by user.user_id
                    order by user_id
                    limit $size
                    offset $offset";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getUserByUserName($userName)
    {
        $query = "select user.user_id, last_name, first_name, user_name, email, address, phone_number, avatar_url, role_name, password
                    from user,role_of_user,role
                    where user_name=? and user.user_id =role_of_user.user_id
                        and role.role_id =role_of_user.role_id;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->setFetchMode(\PDO::FETCH_CLASS, User::class);
            $sth->execute([$userName]);
            return $sth->fetch();
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function checkUserByName($userName)
    {
        $query = "SELECT EXISTS (SELECT * FROM user WHERE user_name = ?)";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userName]);
            return $stmt->fetch(\PDO::FETCH_COLUMN);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }


    public function checkUserNamePassword($user)
    {
        $query = "SELECT EXISTS (SELECT * FROM user WHERE user_name = :user_name AND password = :password)";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute($user);
            return $stmt->fetch(\PDO::FETCH_COLUMN);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function checkUserIdPassword($userId, $password)
    {
        $query = "SELECT EXISTS (SELECT * FROM user WHERE user_id = ? AND password = ?)";
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userId, $password]);
            return $stmt->fetch(\PDO::FETCH_COLUMN);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function insert($user, $role)
    {
        try {
            $query = "insert into user( user_name, password, email) 
                             values (:user_name,:password, :email)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute(["user_name" => $user["user_name"], "password" => $user["password"], "email" => $user["email"]]);
            $this->setRole($user["user_name"], $role);
            return $this->getUserByUserName($user["user_name"]);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function setRole($userName, $role)
    {
        try {
            $query = "insert into role_of_user
                        select user_id, role_id
                        from user,
                             role
                        where user_name = ? and
                            role_name = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userName, $role]);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function ChangePassword($userId, $password)
    {
        $query = "update user set password = ? where user_id = ?;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$password, $userId]);
    }

    public function update($user)
    {
        $query = "update user set first_name =:first_name,last_name= :last_name, email=:email, address = :address,phone_number= :phone_number,avatar_url = :avatar_url
                    where user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"],
            "email" => $user["email"],
            "address" => $user["address"],
            "phone_number" => $user["phone_number"],
            "avatar_url" => $user["avatar_url"],
            "user_id" => $user["user_id"],
        ]);
        return $this->getUserById($user['user_id']);
    }
    public function delete($user_id)
    {
        $this->conn->beginTransaction();
        $query1 = "DELETE  FROM  role_of_user
                WHERE  role_of_user.user_id =  $user_id;";
        $query2 = "DELETE  FROM  user
                WHERE  user.user_id =  $user_id;";
        $stmt = $this->conn->prepare($query1);
        $stmt->execute();
        $stmt = $this->conn->prepare($query2);
        $stmt->execute();
        $this->conn->commit();
        return true;
    }
}
