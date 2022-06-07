<?php
require "../src/constants/HTTP.php";

### user
$router->setRequest(GET, '/users', "UserController@getUserInfo", true);
$router->setRequest(POST, '/users', "UserController@register", false);
$router->setRequest(PUT, '/users', "UserController@update", true);
$router->setRequest(POST, '/users/login', "UserController@login", false);
$router->setRequest(POST, '/users/refresh-token', "UserController@refreshToken", false);
$router->setRequest(POST, '/users/change-password', "UserController@changePassword", true);

//admin
$router->setRequest(GET, '/users/admin', "UserController@getUsers", true);
$router->setRequest(POST, '/users/admin', "UserController@create", true);
$router->setRequest(DELETE, '/users/admin', "UserController@delete", true);
$router->setRequest(PUT, '/users/admin', "UserController@updateInAdmin", true);


### products
$router->setRequest(GET, '/products', "ProductController@getProducts", false);
$router->setRequest(GET, '/products/names', "ProductController@getProductNames", false);
$router->setRequest(POST, '/products', "ProductController@addProduct", false);
$router->setRequest(PUT, '/products', "ProductController@UpdateProduct", false);
$router->setRequest(DELETE, '/products', "ProductController@DeleteProducts", false);

## branch
$router->setRequest(GET, '/products/brands', "ProductController@getBrand", false);
$router->setRequest(POST, '/products/brands', "ProductController@addBrand", false);


##review
$router->setRequest(GET, '/reviews', "CommunityController@getReviews", true);
$router->setRequest(POST, '/reviews', "CommunityController@insertReview", true);
$router->setRequest(DELETE, '/reviews', "CommunityController@deleteReviews", true);



## Order
$router->setRequest(GET, '/orders', "OrdersController@getOrders", true);
$router->setRequest(POST, '/orders', "OrdersController@insertOrder", true);
$router->setRequest(DELETE, '/orders', "OrdersController@deleteOrders", true);


## Cart
$router->setRequest(GET, '/carts', "OrdersController@getCarts", true);
$router->setRequest(POST, '/carts', "OrdersController@insertCart", true);
$router->setRequest(DELETE, '/carts', "OrdersController@deleteCart", true);

# image
$router->setRequest(GET, '/files', "FileController@getImage", false);
$router->setRequest(POST, '/files', "FileController@uploadFiles", false);
