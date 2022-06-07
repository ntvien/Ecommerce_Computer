<?php

namespace Src\ddd\community;

class CommunityRepository
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getReviewsByProduct($productId, $page = 0, $size = 100, $orderBy = "created_time", $typeOrder = "DESC")
    {
        $offset = $page * $size;
        $query = "select review.*, u.user_name,u.first_name, u.last_name, u.avatar_url, p.title_product  from review join user u on u.user_id = review.user_id join product p on p.product_id = review.product_id
                    where p.product_id = $productId
                    group by review_id,created_time
                    order by $orderBy $typeOrder
                    limit $size
                    offset $offset;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function getReviews($page = 0, $size = 100, $orderBy = "created_time", $typeOrder = "DESC")
    {
        $offset = $page * $size;
        $query = "select review.*, u.user_name,u.first_name, u.last_name, u.avatar_url, p.title_product  from review join user u on u.user_id = review.user_id join product p on p.product_id = review.product_id
                    group by review_id,created_time
                    order by $orderBy $typeOrder
                    limit $size
                    offset $offset;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function getReviewsById($id)
    {
        $query = "select review.*, u.user_name,u.first_name, u.last_name, u.avatar_url, p.title_product  from review join user u on u.user_id = review.user_id join product p on p.product_id = review.product_id
                    where review_id = $id";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }


    public function insertReview($comment)
    {
        try {
            $query = "insert into  review(product_id, user_id, content, created_time,number_star)
values (:product_id, :user_id,:content, :created_time, :number_star);";
            $stmt = $this->conn->prepare($query);
            $r = $stmt->execute([
                "product_id" => $comment["product_id"],
                "user_id" => $comment["user_id"],
                "content" => $comment["content"],
                "created_time" => time(),
                "number_star" => $comment["number_star"],
            ]);
            $id = $this->conn->lastInsertId();
            return $this->getReviewsById($id);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function deleteReview($id)
    {
        $query1 = "delete from review where review_id =$id";
        $stmt = $this->conn->prepare($query1);
        $stmt->execute();
        return true;
    }
    public function countReview($productId)
    {
        $query = "select count(review_id) from review where product_id=$productId";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return (int)$sth->fetchAll(\PDO::FETCH_COLUMN)[0];
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
}
