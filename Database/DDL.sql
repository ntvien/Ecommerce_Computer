

drop schema if exists web;
create schema web;
use web;
drop table if exists User;
 create table User(
     user_id int primary key Auto_Increment,
     last_name varchar(25),
     first_name varchar(25),
     user_name varchar(25) unique not null ,
     password varchar(255) not null ,
     email varchar(100),
     address text,
     phone_number varchar(11),
     avatar_url text
 );
drop table if exists Role;
create table Role(
    role_id int primary key Auto_Increment,
    role_name varchar(25) not null unique
);
drop table if exists Role_of_user;
create table Role_of_user(
    user_id int,
    role_id int,
    primary key (user_id,role_id),
    foreign key (user_id) references User(user_id),
    foreign key (role_id) references Role(role_id)

);
drop table if exists Brand;
create table Brand(
    brand_id int primary key Auto_Increment,
    brand_name  varchar(255) unique not null,
    logo_url varchar(255)
);
drop table if exists Product;
create table Product(
    product_id int primary key Auto_Increment,
    brand_id int,
    title_product varchar(255) unique not null,
    main_image_url varchar(255),
    price int,
    discount_percent int,
    type_of_product varchar(255),
    cpu varchar(255),
    ram varchar(255),
    hard_disk varchar(255),
    gpu varchar(255),
    screen varchar(255),
    operating_system varchar(255),
    design_description varchar(255),
    release_time text,
    dimension_weight varchar(255),
    description_detail mediumtext,
    sim_description text,
    pin_charge text,
    front_camera text,
    back_camera text,
    foreign key (brand_id) references Brand(brand_id)

);
drop table if exists Image_product;
create table Image_product(
    product_id int,
    url_image varchar(255),
    primary key (product_id,url_image),
    foreign key (product_id) references Product(product_id)
);
drop table if exists Item_Cart;
create table Item_Cart(
    user_id int,
    product_id int,
    number_items int,
    primary key (user_id,product_id),
    foreign key (user_id) references User(user_id),
    foreign key (product_id) references Product(product_id)
);

drop table if exists Orders;
create table Orders(
    order_id int auto_increment,
    user_id int,
    first_name varchar(255),
    last_name varchar(255),
    time_order long,
    address_order text,
    phone_order varchar(11),
    email_order varchar(255),
    notes text,
    type_payment text,
    primary key (order_id),
    foreign key (user_id) references User(user_id)
);
drop table if exists Item_orders;
create table Item_orders(
    product_id int,
    order_id int,
    number_items int,
    price_per_item_in_time_order int,
    primary key (order_id, product_id),
    foreign key (product_id) references Product(product_id),
    foreign key (order_id) references Orders(order_id)
);
drop table if exists review;
create table review(
    review_id int unique not null auto_increment,
    product_id int not null ,
    user_id int not null ,
    content text,
    created_time long,
    number_star int,
    primary key (review_id,product_id,user_id),
    foreign key (product_id) references Product(product_id),
    foreign key (user_id) references User(user_id)
);
insert into role(role_name)
VALUES ("customer");
insert into role(role_name)
VALUES ("admin");