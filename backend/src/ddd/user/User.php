<?php
namespace Src\ddd\user;
    class User   implements \JsonSerializable{
        private $user_id;
        private $user_name;
        private $password;
        private $email;
        private $phone_number;
        private $address;
        private $last_name;
        private $first_name;
        private $role_name;

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

        /**
         * @return mixed
         */
        public function getUserName()
        {
            return $this->user_name;
        }

        /**
         * @param mixed $user_name
         */
        public function setUserName($user_name): void
        {
            $this->user_name = $user_name;
        }

        /**
         * @return mixed
         */
        public function getPassword()
        {
            return $this->password;
        }

        /**
         * @param mixed $password
         */
        public function setPassword($password): void
        {
            $this->password = $password;
        }

        /**
         * @return mixed
         */
        public function getEmail()
        {
            return $this->email;
        }

        /**
         * @param mixed $email
         */
        public function setEmail($email): void
        {
            $this->email = $email;
        }

        /**
         * @return mixed
         */
        public function getPhone()
        {
            return $this->phone_number;
        }

        /**
         * @param mixed $phone
         */
        public function setPhone($phone): void
        {
            $this->phone_number = $phone;
        }

        /**
         * @return mixed
         */
        public function getAddress()
        {
            return $this->address;
        }

        /**
         * @param mixed $address
         */
        public function setAddress($address): void
        {
            $this->address = $address;
        }

        /**
         * @return mixed
         */
        public function getLastName()
        {
            return $this->last_name;
        }

        /**
         * @param mixed $last_name
         */
        public function setLastName($last_name): void
        {
            $this->last_name = $last_name;
        }

        /**
         * @return mixed
         */
        public function getFirstName()
        {
            return $this->first_name;
        }

        /**
         * @param mixed $first_name
         */
        public function setFirstName($first_name): void
        {
            $this->first_name = $first_name;
        }

        /**
         * @return mixed
         */
        public function getAvatarUrl()
        {
            return $this->avatar_url;
        }

        /**
         * @param mixed $avatar_url
         */
        public function setAvatarUrl($avatar_url): void
        {
            $this->avatar_url = $avatar_url;
        }
        private $avatar_url;

        /**
         * @return mixed
         */
        public function getRole()
        {
            return $this->role_name;
        }

        /**
         * @param mixed $roles
         */
        public function setRole($roles): void
        {
            $this->role_name = $roles;
        }

        public function jsonSerialize()
        {
            return get_object_vars($this);
        }
    }
