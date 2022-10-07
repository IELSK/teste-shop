CREATE TABLE `shopper_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(250) NOT NULL,
  `delivery_date` date NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `shopper_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `price` double NOT NULL,
  `qty_stock` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `shopper_order_products` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  KEY `shopper_order_products_FK_1` (`order_id`),
  KEY `shopper_order_products_FK_2` (`product_id`),
  CONSTRAINT `shopper_order_products_FK_1` FOREIGN KEY (`order_id`) REFERENCES `shopper_order` (`id`),
  CONSTRAINT `shopper_order_products_FK_2` FOREIGN KEY (`product_id`) REFERENCES `shopper_products` (`id`)
);