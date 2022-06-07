<?php

namespace Src\ddd\product;

use Src\core\http\Exception\HttpException;
use Src\ddd\user\repository\UserRepository;
use Src\util\CheckField;
use Src\util\jwt\JwtHandler;

class ProductService
{
    private $productRepository;
    public function __construct($db)
    {
        $this->productRepository = new ProductRepository($db);
    }
    public function getProductById($id){
        return $this->productRepository->GetProductById($id);
    }
    public function getProducts($page, $size, $type, $brand_name, $min_price, $max_price, $sort_by,$type_sort){
        return $this->productRepository->getProducts($page, $size, $type, $brand_name, $min_price, $max_price, $sort_by,$type_sort);
    }
    public function addProduct($product)
    {
        try {

            $id = $this->productRepository->insertProduct($product);
            return $this->productRepository->GetProductById($id);
        } catch (\PDOException $e) {
            throw new HttpException(400, INTERNAL_SERVER_ERROR);
        }
    }


    public function UpdateProduct($request)
    {
//        if (CheckField::array_Any_key_Not_exists($userRequest, "last_name", "first_name", "email", "address", "phone_number", "avatar_url")) {
//            throw new HttpException(404, Miss_PARAM);
//        }
        return $this->productRepository->UpdateProduct($request);

    }

    public function DeleteProducts($request)
    {
        foreach ($request['ids'] as $id){
            $this->productRepository->DeleteProduct($id);
        }
    }

    public function getBrands()
    {
        return $this->productRepository->getBrands();
    }
    public function getProductNames()
    {
        return $this->productRepository->getProductNames();
    }
    public function addBrand($brand)
    {
        try {

            return $this->productRepository->insertBrand($brand);
        } catch (\PDOException $e) {
            throw new HttpException(400, INTERNAL_SERVER_ERROR);
        }
    }

}