<?php

namespace Src\Authentication;
class UserAuth implements  \JsonSerializable {
    private $user_id;

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id): void
    {
        $this->user_id = $user_id;
    }
    private  $roles;


    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
}