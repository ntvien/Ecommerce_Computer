<?php

namespace Src\ddd\product;

use Src\ddd\user\User;

class ProductRepository
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function insertProduct($product)
    {
        try {
            $query = "insert into product(brand_id,title_product, main_image_url, price, discount_percent, type_of_product, cpu, ram, hard_disk, gpu,
                    screen, operating_system, design_description, release_time, dimension_weight, description_detail,
                    sim_description, pin_charge, front_camera, back_camera)
                    values (:brand_id,:title_product, :main_image_url, :price, :discount_percent, :type_of_product, :cpu, :ram, :hard_disk, :gpu,
                            :screen, :operating_system, :design_description, :release_time, :dimension_weight, :description_detail,
                            :sim_description, :pin_charge, :front_camera, :back_camera);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                "brand_id" => $product["brand_id"],
                "title_product" => $product["title_product"],
                "main_image_url" => $product["main_image_url"],
                "price" => $product["price"],
                "discount_percent" => $product["discount_percent"],
                "type_of_product" => $product["type_of_product"],
                "cpu" => $product["cpu"],
                "ram" => $product["ram"],
                "hard_disk" => $product["hard_disk"],
                "gpu" => $product["gpu"],
                "screen" => $product["screen"],
                "operating_system" => $product["operating_system"],
                "design_description" => $product["design_description"],
                "release_time" => $product["release_time"],
                "dimension_weight" => $product["dimension_weight"],
                "description_detail" => $product["description_detail"],
                "sim_description" => $product["sim_description"],
                "pin_charge" => $product["pin_charge"],
                "front_camera" => $product["front_camera"],
                "back_camera" => $product["back_camera"]
            ]);
            $id = $this->conn->lastInsertId();
            foreach ($product['images'] as $item) {
                $item = json_decode(json_encode($item), true);
                $item["product_id"] = $id;
                $this->insertImageProduct($item);
            }
            return $id;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getProductById($id)
    {
        $query = "select product.*, b.* , avg(number_star) as avg_rating, count(review_id)  as number_review from product join brand b on b.brand_id = product.brand_id left join  review r on product.product_id = r.product_id
                        where product.product_id = $id
                        group by product.product_id; ";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            $product = $sth->fetch(\PDO::FETCH_ASSOC);
            $images = $this->getImageProductById($id);
            $product["images"] = $images;
            return $product;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getProducts($page, $size, $type_or_products, $brand_names, $min_price = 0, $max_price = INFO_ALL, $sort_by = "price", $type_order = "DESC")
    {
        $offset = $size * $page;
        $queryBrands = "";
        $isFirst = true;
        foreach ($brand_names as $brand) {
            $queryBrands = $queryBrands .(!$isFirst ? " or" : "") ." brand_name like concat('%','" . $brand . "','%')";
            $isFirst= false;
        }
        if ($queryBrands != "") {
            $queryBrands = "(" . $queryBrands . ")";
        }
        $queryType = "";
        $isFirst = true;
        foreach ($type_or_products as $type) {
            $queryType = $queryType . (!$isFirst ? " or" : "") . " type_of_product like concat('%','" . $type . "','%')";
            $isFirst= false;
        }
        if ($queryType != "") {
            $queryType = "(" . $queryType . ")";
        }
        $mergeQuery="";
        if ($queryBrands != "")
            $mergeQuery = $queryBrands . ($queryType != "" ? (" and ". $queryType):"");
        else
            $mergeQuery = $queryType != "" ? $queryType : "";

        $query = "select product .*, b .* , avg(number_star) as avg_rating, count(review_id) as number_review, (1-discount_percent/100)*price as price_after_discount from product join brand b on b . brand_id = product . brand_id left join review r on product . product_id = r . product_id
                        where  " .($mergeQuery!=""?($mergeQuery ." and "):"") ."(1 - (discount_percent / 100)) * price between $min_price and $max_price
                        group by product . product_id,price,discount_percent,release_time
                        order by $sort_by $type_order
                        limit $size
                        offset $offset;";
//        var_dump($query);
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            $products = $sth->fetchAll(\PDO::FETCH_ASSOC);
            for ($i = 0; $i < count($products); $i++) {
                $products[$i]["images"] = $this->getImageProductById($products[$i]["product_id"]);
            }
            return $products;
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function UpdateProduct($product)
    {
        $query = "update product set brand_id = :brand_id, title_product =:title_product, main_image_url =:main_image_url, price =:price, discount_percent =:discount_percent, type_of_product =:type_of_product, cpu =:cpu, ram =:ram, hard_disk =:hard_disk, gpu =:gpu,
        screen =:screen, operating_system =:operating_system, design_description =:design_description, release_time =:release_time, dimension_weight =:dimension_weight, description_detail =:description_detail,
        sim_description =:sim_description, pin_charge =:pin_charge, front_camera =:front_camera, back_camera =:back_camera
where product_id =:product_id";
        $stmt = $this->conn->prepare($query);
        $r = $stmt->execute([
            "brand_id" => $product["brand_id"],
            "title_product" => $product["title_product"],
            "main_image_url" => $product["main_image_url"],
            "price" => $product["price"],
            "discount_percent" => $product["discount_percent"],
            "type_of_product" => $product["type_of_product"],
            "cpu" => $product["cpu"],
            "ram" => $product["ram"],
            "hard_disk" => $product["hard_disk"],
            "gpu" => $product["gpu"],
            "screen" => $product["screen"],
            "operating_system" => $product["operating_system"],
            "design_description" => $product["design_description"],
            "release_time" => $product["release_time"],
            "dimension_weight" => $product["dimension_weight"],
            "description_detail" => $product["description_detail"],
            "sim_description" => $product["sim_description"],
            "pin_charge" => $product["pin_charge"],
            "front_camera" => $product["front_camera"],
            "back_camera" => $product["back_camera"],
            "product_id" => $product["product_id"]
        ]);
        foreach ($product['images'] as $item) {
            $item = json_decode(json_encode($item), true);
            $item["product_id"] = $product['product_id'];
            $this->insertImageProduct($item);
        }
        return $this->getProductById($product['product_id']);
    }

    public function DeleteProduct($id)
    {
        $this->conn->beginTransaction();
        $query1 = "delete from  image_product where product_id = $id";
        $query2 = "delete  from product where product_id = $id";
        $stmt = $this->conn->prepare($query1);
        $stmt->execute();
        $stmt = $this->conn->prepare($query2);
        $stmt->execute();
        $this->conn->commit();
        return true;
    }

    public function insertImageProduct($imageProduct)
    {
        try {
            $query = "insert into image_product(product_id, url_image)
                        VALUES(:product_id,:url_image);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute(["product_id" => $imageProduct["product_id"], "url_image" => $imageProduct["url_image"]]);

        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getImageProductById($productId)
    {
        $query = "select url_image from image_product
                where product_id = $productId";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getBrandByName($brand_name)
    {
        $query = "select * from brand where brand_name = ?;";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute([$brand_name]);
            return $sth->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getBrands()
    {
        $query = "select * from brand";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }

    public function getProductNames()
    {
        $query = "select product_id, title_product from product";
        try {
            $sth = $this->conn->prepare($query);
            $sth->execute();
            return $sth->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }


    public function insertBrand($brand)
    {
        try {
            $query = "insert into brand(brand_name, logo_url) VALUES(:brand_name,:logo_url);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute(["brand_name" => $brand["brand_name"], "logo_url" => $brand["logo_url"]]);
            return $this->getBrandByName($brand["brand_name"]);
        } catch (\PDOException $exception) {
            throw new $exception;
        }
    }
}