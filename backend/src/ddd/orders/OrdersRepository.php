<?php

namespace Src\ddd\orders;

class OrdersRepository
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function getCartOfUser($userId)
    {
        $query = "select  item_cart.*, title_product, main_image_url, price, discount_percent
from item_cart join product p on p.product_id = item_cart.product_id where user_id =  $userId;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function insertCart($cart)
    {
        try {
            $query = "insert into item_cart(user_id, product_id, number_items)
                values (:user_id, :product_id, :number_items)
                on duplicate KEY UPDATE
                number_items= number_items + :number_items;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute(["product_id" => $cart["product_id"],
                "user_id" => $cart["user_id"],
                "number_items" => $cart["number_items"]
            ]);
            $id = $this->conn->lastInsertId();

            return $this->getCartById( $cart["product_id"],$cart["user_id"]);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function getCartById($product_id, $user_id)
    {
        $query = "select  item_cart.*, title_product, main_image_url, price, discount_percent
                    from item_cart join product p on p.product_id = item_cart.product_id 
                    where user_id = $user_id and item_cart.product_id = $product_id";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function deleteCart($user_id, $product_id)
    {
        $query2 = "delete from item_cart where user_id= $user_id and product_id = $product_id;";
        $stmt = $this->conn->prepare($query2);
        $stmt->execute();
        return true;
    }

    public function getOrders($page, $size)
    {
        $offset = $page*$size;
        $query = "select orders.* ,SUM(i.number_items*i.price_per_item_in_time_order) as total_price from orders join item_orders i on orders.order_id = i.order_id
        group by i.order_id, time_order
        order by  time_order DESC
        limit $size
        offset $offset;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            $orders =  $sth->fetchAll(\PDO::FETCH_ASSOC);
            for($i=0;$i<count($orders);$i++){
                $orders[$i]["items"]= $this->getItemsOfOrder($orders[$i]["order_id"]);
            }
            return $orders;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getOrderOfUser($userId, $page =0, $size = 100)
    {
        $offset = $page*$size;
        $query = "select orders.* ,SUM(i.number_items*i.price_per_item_in_time_order) as total_price from orders join item_orders i on orders.order_id = i.order_id
                    where user_id = $userId
                    group by i.order_id, time_order
                    order by  time_order DESC
                    limit $size
                    offset $offset";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            $orders =  $sth->fetchAll(\PDO::FETCH_ASSOC);
            for($i=0;$i<count($orders);$i++){
                $orders[$i]["items"]= $this->getItemsOfOrder($orders[$i]["order_id"]);
            }
            return $orders;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function getOrderById($id)
    {
        $query = "select orders.* ,SUM(i.number_items*i.price_per_item_in_time_order) as total_price from orders join item_orders i on orders.order_id = i.order_id
                   where orders.order_id = $id";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            $orders =  $sth->fetch(\PDO::FETCH_ASSOC);
            $orders["items"] = $this->getItemsOfOrder($id);
            return $orders;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getItemsOfOrder($id)
    {
        $query = "select  item_orders.*, p.title_product, p.type_of_product, p.main_image_url from item_orders join product p on p.product_id = item_orders.product_id
                        where order_id= $id
                        group by order_id,p.product_id";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function insertOrder($orders)
    {
        try {
            $query = "insert into  orders( user_id, first_name,last_name, time_order, address_order, phone_order,email_order,notes,type_payment)
 VALUES (:user_id, :first_name, :last_name,:time_order, :address_order, :phone_order,:email_order,:notes,:type_payment);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                "user_id" => $orders["user_id"],
                "first_name" => $orders["first_name"],
                "last_name" => $orders["last_name"],
                "time_order" => $orders["time_order"],
                "address_order" => $orders["address_order"],
                "phone_order" => $orders["phone_order"],
                "email_order" => $orders["email_order"],
                "notes" => $orders["notes"],
                "type_payment" => $orders["type_payment"],
            ]);
            $id = $this->conn->lastInsertId();
            foreach ($orders['items'] as $item){
                $item =json_decode(json_encode($item), true);
                $item['order_id']= $id;
                $this->insertItemOrders($item);
            }
            $query2 = "delete from item_cart where user_id= ?;";
            $stmt = $this->conn->prepare($query2);
            $stmt->execute([$orders["user_id"]]);
            return $this->getOrderById($id);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function insertItemOrders($item)
    {
        try {
            $query = "insert into item_orders(product_id, order_id, number_items, price_per_item_in_time_order)
                    select :product_id, :order_id, :number_items, (1-discount_percent/100)*price as price_per_item_in_time_order from product
                    where product_id= :product_id
                    on duplicate KEY UPDATE
                    number_items= number_items + :number_items;";
            $stmt = $this->conn->prepare($query);
            $r = $stmt->execute([
                "product_id" => $item["product_id"],
                "order_id" => $item["order_id"],
                "number_items" => $item["number_items"]
            ]);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
    public function deleteOrders($id)
    {
        $this->conn->beginTransaction();
        $query1 = "delete from item_orders where  order_id = $id;";
        $query2 = "delete from orders where  order_id =$id;";
        $stmt = $this->conn->prepare($query1);
        $stmt->execute();
        $stmt = $this->conn->prepare($query2);
        $stmt->execute();
        $this->conn->commit();
        return true;
    }


}