CREATE DATABASE  IF NOT EXISTS `orders` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `orders`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: orders
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bucket`
--

DROP TABLE IF EXISTS `bucket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bucket` (
  `payment_state` bit(1) NOT NULL,
  `total_price` int DEFAULT NULL,
  `bucket_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bucket`
--

LOCK TABLES `bucket` WRITE;
/*!40000 ALTER TABLE `bucket` DISABLE KEYS */;
INSERT INTO `bucket` VALUES (_binary '',1900,1,10),(_binary '',11000,2,11),(_binary '',120500,3,10),(_binary '',3400,4,10),(_binary '',2500,5,17),(_binary '',2400,6,10),(_binary '',3000,7,17),(_binary '',5000,8,16),(_binary '',4400,9,10),(_binary '',3800,10,17);
/*!40000 ALTER TABLE `bucket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funding`
--

DROP TABLE IF EXISTS `funding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funding` (
  `bucket_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `flag_id` bigint NOT NULL,
  `funding_id` bigint NOT NULL AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `funding_state` enum('BEFORE_ORDER','CANCEL','FAILURE','ORDER_COMPLETED','PAYMENT_IN_PROGRESS','WAITING') NOT NULL,
  `requirement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`funding_id`),
  UNIQUE KEY `UK_bgslmkt63x72xoguulrk662wg` (`bucket_id`),
  CONSTRAINT `FKpk5cvryxmbyp1rtvssxdu4eh6` FOREIGN KEY (`bucket_id`) REFERENCES `bucket` (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funding`
--

LOCK TABLES `funding` WRITE;
/*!40000 ALTER TABLE `funding` DISABLE KEYS */;
INSERT INTO `funding` VALUES (1,'2023-11-16 22:24:43.467641',22,1,11,10,'WAITING',''),(2,'2023-11-16 22:24:53.134670',19,2,8,11,'ORDER_COMPLETED','요청사항 없음'),(3,'2023-11-16 22:25:22.352624',40,3,12,10,'WAITING',''),(4,'2023-11-16 22:27:45.139599',45,4,11,10,'ORDER_COMPLETED',''),(5,'2023-11-16 22:28:03.667259',45,5,11,17,'ORDER_COMPLETED',''),(6,'2023-11-16 22:32:20.738238',45,6,11,10,'ORDER_COMPLETED',''),(8,'2023-11-17 08:58:29.509877',22,7,11,16,'WAITING',''),(9,'2023-11-17 08:59:15.825999',22,8,11,10,'WAITING',''),(10,'2023-11-17 09:07:32.659559',22,9,11,17,'WAITING','팥 많이 넣어주세요');
/*!40000 ALTER TABLE `funding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_menu`
--

DROP TABLE IF EXISTS `order_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_menu` (
  `count` int NOT NULL,
  `price` int NOT NULL,
  `bucket_id` bigint NOT NULL,
  `menu_id` bigint NOT NULL,
  `order_menu_id` bigint NOT NULL AUTO_INCREMENT,
  `menu_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`order_menu_id`),
  KEY `FKnjwdbvhv4y64hi55h7g3drsjv` (`bucket_id`),
  CONSTRAINT `FKnjwdbvhv4y64hi55h7g3drsjv` FOREIGN KEY (`bucket_id`) REFERENCES `bucket` (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_menu`
--

LOCK TABLES `order_menu` WRITE;
/*!40000 ALTER TABLE `order_menu` DISABLE KEYS */;
INSERT INTO `order_menu` VALUES (2,500,1,20,1,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(1,500,1,21,2,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(2,5000,2,30,3,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%94%A8%EC%95%97.png?alt=media&token=21c4342a-4208-4d42-8bb2-2dbcb52d15a7','씨앗호떡'),(1,2000,3,16,4,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%98%B8%EB%96%A1.jfif?alt=media&token=f7cbb9bb-09ee-4109-9123-fa77393cf596','호오오떡!'),(1,2500,3,17,5,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%99%95%EC%94%A8%EC%95%97%ED%98%B8%EB%96%A1.jpg?alt=media&token=1bb08e29-00a8-41db-91a8-3d56567a9184','왕씨앗호우떠억'),(2,5000,3,18,6,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%B0%B9%EC%8C%80%ED%98%B8%EB%96%A1%EB%AF%B9%EC%8A%A4.jpg?alt=media&token=2ee0eb68-d160-4b86-b199-c4afc23c80f5','호떡 믹스'),(2,2000,3,19,7,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EB%AF%B8%EB%8B%88%EA%BF%80%ED%98%B8%EB%96%A1.jpg?alt=media&token=497c4e67-abb8-43f6-b0ee-3d8e068311ac','꿀 호떡'),(2,500,4,20,8,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(4,500,4,21,9,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(3,500,5,20,10,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(2,500,5,21,11,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(2,500,6,20,12,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(2,500,6,21,13,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(6,500,7,20,14,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(6,500,8,21,15,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(4,500,8,20,16,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(2,500,9,20,17,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(6,500,9,21,18,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵'),(4,500,10,20,19,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵'),(2,500,10,21,20,'https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵');
/*!40000 ALTER TABLE `order_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_menu_options`
--

DROP TABLE IF EXISTS `order_menu_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_menu_options` (
  `options_order_option_id` bigint NOT NULL,
  `order_menu_order_menu_id` bigint NOT NULL,
  UNIQUE KEY `UK_3qcl04l315yeujbh2gxpfotvn` (`options_order_option_id`),
  KEY `FKqjfo0a0bakstyd6lw7jyur44` (`order_menu_order_menu_id`),
  CONSTRAINT `FKap22ccorx7rm2m4iti1rxmxn7` FOREIGN KEY (`options_order_option_id`) REFERENCES `order_option` (`order_option_id`),
  CONSTRAINT `FKqjfo0a0bakstyd6lw7jyur44` FOREIGN KEY (`order_menu_order_menu_id`) REFERENCES `order_menu` (`order_menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_menu_options`
--

LOCK TABLES `order_menu_options` WRITE;
/*!40000 ALTER TABLE `order_menu_options` DISABLE KEYS */;
INSERT INTO `order_menu_options` VALUES (1,1),(2,3),(3,4),(4,5),(5,6),(6,7),(7,8),(8,12),(9,17),(10,19);
/*!40000 ALTER TABLE `order_menu_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_option`
--

DROP TABLE IF EXISTS `order_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_option` (
  `price` int NOT NULL,
  `option_id` bigint NOT NULL,
  `order_option_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`order_option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_option`
--

LOCK TABLES `order_option` WRITE;
/*!40000 ALTER TABLE `order_option` DISABLE KEYS */;
INSERT INTO `order_option` VALUES (200,42,1,'팥 곱빼기'),(500,50,2,'씨앗많이'),(500,35,3,'속 추가'),(500,37,4,'수박 씨 추가'),(50000,38,5,'호떡 클래스 - 1시간'),(500,40,6,'고급 포장'),(200,42,7,'팥 곱빼기'),(200,42,8,'팥 곱빼기'),(200,42,9,'팥 곱빼기'),(200,42,10,'팥 곱빼기');
/*!40000 ALTER TABLE `order_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_record`
--

DROP TABLE IF EXISTS `order_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_record` (
  `bucket_id` bigint DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `order_state` enum('COMPLETED','PAYMENT_IN_PROGRESS','PROCESSING','REFUSED','WAITING') NOT NULL,
  `receipt_number` varchar(255) NOT NULL,
  `requirement` varchar(255) DEFAULT NULL,
  `review_state` enum('COMPLETED','NONE','REQUEST') NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `UK_i4tq9cy040kw0qpeeokeg4893` (`bucket_id`),
  CONSTRAINT `FKabk1wbit4vkx39ucb7xctkft3` FOREIGN KEY (`bucket_id`) REFERENCES `bucket` (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_record`
--

LOCK TABLES `order_record` WRITE;
/*!40000 ALTER TABLE `order_record` DISABLE KEYS */;
INSERT INTO `order_record` VALUES (2,'2023-11-16 22:27:00.275485',1,8,11,'WAITING','8_20231116-1','요청사항 없음','NONE'),(6,'2023-11-16 22:33:17.466740',2,11,10,'COMPLETED','11_20231116-1','','NONE'),(4,'2023-11-16 22:35:07.628488',3,11,10,'COMPLETED','11_20231116-2','','NONE'),(7,'2023-11-16 22:35:33.387902',4,11,17,'COMPLETED','11_20231116-3','','NONE'),(5,'2023-11-16 22:36:46.752832',5,11,17,'COMPLETED','11_20231116-4','','NONE');
/*!40000 ALTER TABLE `order_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:43
CREATE DATABASE  IF NOT EXISTS `noti` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `noti`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: noti
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `total_price` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `target_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `type` enum('COMPLETED','DONE_F','DONE_R','FAILURE','PROCESSING','REFUSED','REQUEST','SUCCESS') DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (11000,'2023-11-16 22:26:36.140753',201,2,11,'녹산 호떡 트럭','SUCCESS'),(3400,'2023-11-16 22:32:50.061182',202,4,10,'붕붕어빵','SUCCESS'),(2500,'2023-11-16 22:32:50.428437',203,5,17,'붕붕어빵','SUCCESS'),(2400,'2023-11-16 22:32:50.430593',204,6,10,'붕붕어빵','SUCCESS'),(0,'2023-11-16 22:33:31.873814',205,2,10,'붕붕어빵','PROCESSING'),(0,'2023-11-16 22:33:38.427014',206,2,10,'붕붕어빵','COMPLETED'),(0,'2023-11-16 22:33:48.429367',207,2,10,'붕붕어빵','DONE_R'),(0,'2023-11-16 22:35:17.021366',208,3,10,'붕붕어빵','PROCESSING'),(0,'2023-11-16 22:35:19.361265',209,3,10,'붕붕어빵','COMPLETED'),(0,'2023-11-16 22:35:29.359860',210,3,10,'붕붕어빵','DONE_R'),(0,'2023-11-16 22:35:38.741600',211,4,17,'붕붕어빵','PROCESSING'),(0,'2023-11-16 22:35:38.788852',212,4,17,'붕붕어빵','PROCESSING'),(0,'2023-11-16 22:35:40.744853',213,4,17,'붕붕어빵','COMPLETED'),(0,'2023-11-16 22:35:50.746609',214,4,17,'붕붕어빵','DONE_R'),(0,'2023-11-16 22:37:00.812009',215,5,17,'붕붕어빵','PROCESSING'),(0,'2023-11-16 22:37:02.854807',216,5,17,'붕붕어빵','COMPLETED'),(0,'2023-11-16 22:37:12.857286',217,5,17,'붕붕어빵','DONE_R');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:44
CREATE DATABASE  IF NOT EXISTS `pay` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pay`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: pay
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `payment_record`
--

DROP TABLE IF EXISTS `payment_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_record` (
  `price` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `funding_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `owner_id` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `state` enum('CALCULATE','FUNDING','ORDER','REFUND') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3i3tjwqt73wl5jn7s8oe0nk3c` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_record`
--

LOCK TABLES `payment_record` WRITE;
/*!40000 ALTER TABLE `payment_record` DISABLE KEYS */;
INSERT INTO `payment_record` VALUES (1900,'2023-11-16 22:24:43.543107',1,1,NULL,28,'2023-11-16 22:24:43.543373',10,'10funding1','FUNDING'),(11000,'2023-11-16 22:24:53.173105',2,2,1,25,'2023-11-16 22:27:00.833615',11,'11funding2','ORDER'),(120500,'2023-11-16 22:25:22.383923',3,3,NULL,29,'2023-11-16 22:25:22.383950',10,'10funding3','FUNDING'),(3400,'2023-11-16 22:27:45.181592',4,4,3,28,'2023-11-16 22:35:07.661805',10,'10funding4','ORDER'),(2500,'2023-11-16 22:28:03.698606',5,5,5,28,'2023-11-16 22:36:46.787252',17,'17funding5','ORDER'),(2400,'2023-11-16 22:32:20.780275',6,6,2,28,'2023-11-16 22:33:17.517907',10,'10funding6','ORDER'),(3000,'2023-11-16 22:35:33.423768',NULL,7,4,28,'2023-11-16 22:35:33.423795',17,'17order4','ORDER'),(5000,'2023-11-17 08:58:29.544617',7,8,NULL,28,'2023-11-17 08:58:29.544646',16,'16funding7','FUNDING'),(4400,'2023-11-17 08:59:15.857967',8,9,NULL,28,'2023-11-17 08:59:15.857997',10,'10funding8','FUNDING'),(3800,'2023-11-17 09:07:32.691243',9,10,NULL,28,'2023-11-17 09:07:32.691290',17,'17funding9','FUNDING');
/*!40000 ALTER TABLE `payment_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:44
CREATE DATABASE  IF NOT EXISTS `store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `store`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: store
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `flag`
--

DROP TABLE IF EXISTS `flag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flag` (
  `flag_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `close_time` time(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `lati` double NOT NULL,
  `longi` double NOT NULL,
  `open_time` time(6) DEFAULT NULL,
  `state` enum('FAILURE','SUCCESS','WAITING') DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  `region_1depth_name` varchar(255) DEFAULT NULL,
  `region_2depth_name` varchar(255) DEFAULT NULL,
  `region_3depth_name` varchar(255) DEFAULT NULL,
  `region_4depth_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`flag_id`),
  KEY `FKd4fpkkp451xr4gmjqeghp0fhr` (`store_id`),
  CONSTRAINT `FKd4fpkkp451xr4gmjqeghp0fhr` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flag`
--

LOCK TABLES `flag` WRITE;
/*!40000 ALTER TABLE `flag` DISABLE KEYS */;
INSERT INTO `flag` VALUES (19,'2023-11-16 10:17:54.245315','2023-11-16 22:26:36.106228','ACTIVE','부산광역시 강서구 송정동','17:17:00.000000','2023-11-16',35.09329221448336,128.85414216839686,'06:17:00.000000','SUCCESS',8,'부산광역시','강서구','송정동',''),(20,'2023-11-16 11:12:51.299402','2023-11-16 11:12:51.299402','ACTIVE','부산광역시 강서구 송정동','19:00:00.000000','2023-11-18',35.09338741750602,128.85380989671768,'09:00:00.000000','WAITING',12,'부산광역시','강서구','송정동',''),(21,'2023-11-16 11:13:27.342148','2023-11-16 11:13:27.342148','ACTIVE','부산광역시 강서구 송정동','19:00:00.000000','2023-11-18',35.09071427859145,128.854026234362,'09:00:00.000000','WAITING',12,'부산광역시','강서구','송정동',''),(22,'2023-11-16 11:21:19.772037','2023-11-16 11:21:19.772037','ACTIVE','부산광역시 강서구 송정동','17:21:00.000000','2023-11-17',35.09348727046833,128.85376281556017,'11:21:00.000000','WAITING',11,'부산광역시','강서구','송정동',''),(23,'2023-11-16 11:24:23.079791','2023-11-16 11:24:23.079791','ACTIVE','부산광역시 강서구 송정동','16:24:00.000000','2023-11-18',35.09094552450003,128.85437411067159,'11:23:00.000000','WAITING',11,'부산광역시','강서구','송정동',''),(24,'2023-11-16 11:31:15.262821','2023-11-16 21:22:37.273031','ACTIVE','부산광역시 강서구 송정동','23:30:00.000000','2023-11-16',35.09088376841549,128.8547290583927,'16:30:00.000000','SUCCESS',13,'부산광역시','강서구','송정동',''),(25,'2023-11-16 12:06:36.259319','2023-11-16 12:06:36.259319','ACTIVE','부산광역시 강서구 송정동','17:06:00.000000','2023-11-17',35.096100363870896,128.85908527051276,'04:06:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(26,'2023-11-16 12:10:29.736434','2023-11-16 12:10:29.736434','ACTIVE','부산광역시 강서구 송정동','23:30:00.000000','2023-11-17',35.09085738213496,128.85453932325643,'04:30:00.000000','WAITING',13,'부산광역시','강서구','송정동',''),(27,'2023-11-16 12:11:00.455989','2023-11-16 12:11:00.455989','ACTIVE','부산광역시 강서구 송정동','23:10:00.000000','2023-11-18',35.09054665968072,128.85393746493702,'11:30:00.000000','WAITING',13,'부산광역시','강서구','송정동',''),(28,'2023-11-16 12:30:26.361118','2023-11-16 12:30:26.361118','ACTIVE','부산광역시 강서구 송정동','20:30:00.000000','2023-11-18',35.095288719242205,128.85912166659972,'12:30:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(29,'2023-11-16 12:33:24.857072','2023-11-16 12:33:24.857072','ACTIVE','부산광역시 강서구 송정동','17:33:00.000000','2023-11-20',35.09360474749973,128.85550888821177,'13:33:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(30,'2023-11-16 12:34:09.585769','2023-11-16 12:34:09.585769','ACTIVE','부산광역시 강서구 송정동','19:34:00.000000','2023-11-22',35.090013360812016,128.8552191886695,'12:34:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(31,'2023-11-16 12:40:46.200469','2023-11-16 12:40:46.200469','ACTIVE','부산광역시 강서구 송정동','17:40:00.000000','2023-11-21',35.09097900394895,128.852774050023,'12:40:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(32,'2023-11-16 12:41:48.514041','2023-11-16 12:41:48.514041','ACTIVE','부산광역시 강서구 송정동','16:41:00.000000','2023-11-19',35.09252930107684,128.8444868966696,'13:41:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(33,'2023-11-16 15:43:03.462160','2023-11-16 20:37:32.307119','ACTIVE','부산광역시 강서구 송정동','15:20:00.000000','2023-11-16',35.08884760180093,128.85719375042683,'15:42:00.000000','FAILURE',11,'부산광역시','강서구','송정동',''),(34,'2023-11-16 16:39:08.108867','2023-11-16 16:39:08.108867','ACTIVE','부산광역시 강서구 송정동','19:39:00.000000','2023-11-17',35.08326204135626,128.8801616013678,'12:38:00.000000','WAITING',8,'부산광역시','강서구','송정동',''),(35,'2023-11-16 17:35:07.668973','2023-11-16 17:35:35.726918','ACTIVE','부산광역시 강서구 송정동','21:34:00.000000','2023-11-16',35.08439958996761,128.87741392759946,'12:34:00.000000','FAILURE',8,'부산광역시','강서구','송정동',''),(36,'2023-11-16 20:31:20.130345','2023-11-16 20:31:20.130345','ACTIVE','부산광역시 강서구 명지동','23:31:00.000000','2023-11-17',35.10132647495608,128.92835437192295,'20:31:00.000000','WAITING',8,'부산광역시','강서구','명지동',''),(37,'2023-11-16 20:32:17.211065','2023-11-16 20:32:17.211065','ACTIVE','부산광역시 강서구 명지동','22:35:00.000000','2023-11-18',35.09182598120203,128.90281360004053,'08:32:00.000000','WAITING',8,'부산광역시','강서구','명지동',''),(38,'2023-11-16 20:36:07.335825','2023-11-16 22:32:50.033388','ACTIVE','부산광역시 강서구 송정동','20:36:00.000000','2023-11-16',35.1,129,'20:35:00.000000','FAILURE',11,'부산광역시','강서구','송정동',''),(39,'2023-11-16 20:39:25.814013','2023-11-16 21:55:28.682228','ACTIVE','부산광역시 강서구 송정동','23:39:00.000000','2023-11-16',35.09290734394965,128.85396898200466,'20:39:00.000000','FAILURE',8,'부산광역시','강서구','송정동',''),(40,'2023-11-16 21:03:39.614427','2023-11-16 21:03:39.614427','ACTIVE','부산광역시 강서구 송정동','23:03:00.000000','2023-11-17',35.085573319191845,128.8801817644736,'21:03:00.000000','WAITING',12,'부산광역시','강서구','송정동',''),(41,'2023-11-16 21:13:03.617950','2023-11-16 21:13:12.761613','ACTIVE','부산광역시 강서구 송정동','23:12:00.000000','2023-11-16',35.08913630811187,128.85717288692075,'16:12:00.000000','SUCCESS',12,'부산광역시','강서구','송정동',''),(42,'2023-11-16 21:22:26.172015','2023-11-16 21:22:37.273210','ACTIVE','부산광역시 강서구 송정동','22:22:00.000000','2023-11-16',35.09350369379987,128.8526886319416,'09:22:00.000000','FAILURE',13,'부산광역시','강서구','송정동',''),(43,'2023-11-16 21:27:33.109042','2023-11-17 03:00:00.079310','ACTIVE','부산광역시 강서구 송정동','23:27:00.000000','2023-11-16',35.09360373928827,128.85733999664888,'21:27:00.000000','FAILURE',13,'부산광역시','강서구','송정동',''),(44,'2023-11-16 22:25:05.612131','2023-11-16 22:25:05.612131','ACTIVE','부산광역시 강서구 신호동','22:24:00.000000','2023-11-17',35.085903389731655,128.8774922520307,'10:24:00.000000','WAITING',11,'부산광역시','강서구','신호동',''),(45,'2023-11-16 22:27:26.939260','2023-11-16 22:32:50.033753','ACTIVE','부산광역시 강서구 송정동','22:27:00.000000','2023-11-16',35.09357564903276,128.855349238402,'10:27:00.000000','SUCCESS',11,'부산광역시','강서구','송정동','');
/*!40000 ALTER TABLE `flag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `menu_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `store_id` bigint DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `FK4sgenfcmk1jajhgctnkpn5erg` (`store_id`),
  CONSTRAINT `FK4sgenfcmk1jajhgctnkpn5erg` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (14,'2023-11-16 10:04:39.128155','2023-11-16 22:08:12.000811','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%98%B8%EB%96%A1.jpeg?alt=media&token=47827542-c2b7-4171-b0ee-bc8cdcc7df4c','호호떡',1500,8),(15,'2023-11-16 11:02:14.473269','2023-11-16 20:13:55.207602','INACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%98%B8%EB%96%A1-removebg-preview%20(2).png?alt=media&token=5ccfe4dd-9613-4d38-9c5b-869e529bdc63','눈알 호떡22',1200,8),(16,'2023-11-16 11:05:53.337886','2023-11-16 11:05:53.337886','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%98%B8%EB%96%A1.jfif?alt=media&token=f7cbb9bb-09ee-4109-9123-fa77393cf596','호오오떡!',2000,12),(17,'2023-11-16 11:06:57.156591','2023-11-16 11:06:57.156591','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%99%95%EC%94%A8%EC%95%97%ED%98%B8%EB%96%A1.jpg?alt=media&token=1bb08e29-00a8-41db-91a8-3d56567a9184','왕씨앗호우떠억',2500,12),(18,'2023-11-16 11:08:14.791749','2023-11-16 11:08:14.791749','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%B0%B9%EC%8C%80%ED%98%B8%EB%96%A1%EB%AF%B9%EC%8A%A4.jpg?alt=media&token=2ee0eb68-d160-4b86-b199-c4afc23c80f5','호떡 믹스',5000,12),(19,'2023-11-16 11:09:06.796030','2023-11-16 11:09:06.796030','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EB%AF%B8%EB%8B%88%EA%BF%80%ED%98%B8%EB%96%A1.jpg?alt=media&token=497c4e67-abb8-43f6-b0ee-3d8e068311ac','꿀 호떡',2000,12),(20,'2023-11-16 11:10:22.926744','2023-11-16 11:11:13.261261','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%ED%8C%A5%EB%B6%95.jpg?alt=media&token=e27ae497-194c-4cfb-99f2-63d0840e883f','팥 붕어빵',500,11),(21,'2023-11-16 11:10:58.709604','2023-11-16 11:10:58.709604','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%8A%88%EB%B6%95.jpg?alt=media&token=7d377fb1-051c-4d81-87a8-f851f8d6036c','슈크림 붕어빵',500,11),(22,'2023-11-16 11:26:52.880745','2023-11-16 11:28:52.130434','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%96%91%EB%85%90.PNG?alt=media&token=e9c42e94-e888-4e7d-8cc7-f5afd5bbf2f0','양념꼬치 1p',2000,13),(23,'2023-11-16 11:27:17.430380','2023-11-16 11:28:43.124189','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EB%8D%B0%EB%A6%AC%EC%95%BC%EB%81%BC.PNG?alt=media&token=284c11ba-127c-42f5-869b-533a4ad39f71','데리야끼 1p',2000,13),(24,'2023-11-16 11:28:36.212183','2023-11-16 11:28:36.212183','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%86%8C%EA%B8%88.PNG?alt=media&token=c96746d4-4f6c-4041-afec-4a0336c91f36','소금구이 1p',1500,13),(25,'2023-11-16 11:29:16.892674','2023-11-16 11:29:16.892674','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%97%BC%ED%86%B5.PNG?alt=media&token=ffce69a2-a381-4c15-a1e5-5ebf7ec9dc0b','염통구이 4p',2000,13),(26,'2023-11-16 20:12:14.981765','2023-11-16 20:13:17.528758','INACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%95%BC%EC%B1%84%ED%98%B8%EB%96%A1.png?alt=media&token=1c4968bc-46c8-4e2a-948a-cfe812c1ef5d','야채 호떡',3000,8),(27,'2023-11-16 20:13:45.390343','2023-11-16 20:17:11.611783','INACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%95%BC%EC%B1%84%ED%98%B8%EB%96%A1.png?alt=media&token=537b5dc7-664f-4f24-850a-d76480353ed4','야채 호떡',2000,8),(28,'2023-11-16 20:17:09.145205','2023-11-16 20:17:40.179297','INACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EB%B6%95%EC%96%B4%EB%B9%B5.jpg?alt=media&token=e3c66d15-b3da-4dde-8a22-e56d0fb5f9fb','붕붕붕어빵',1000,8),(29,'2023-11-16 20:17:33.834770','2023-11-16 20:17:33.834770','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%95%BC%EC%B1%84%ED%98%B8%EB%96%A1.png?alt=media&token=2327cada-bf52-4ec3-8896-07840456a810','야채 호떡',3000,8),(30,'2023-11-16 22:08:03.358219','2023-11-16 22:08:03.358219','ACTIVE','https://firebasestorage.googleapis.com/v0/b/street-food-fighter.appspot.com/o/menu_images%2F%EC%94%A8%EC%95%97.png?alt=media&token=21c4342a-4208-4d42-8bb2-2dbcb52d15a7','씨앗호떡',5000,8);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `option_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `menu_id` bigint DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `FKm7sg4skem33puh3mihh15g4k9` (`menu_id`),
  CONSTRAINT `FKm7sg4skem33puh3mihh15g4k9` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (35,'2023-11-16 11:05:53.339902','2023-11-16 11:05:53.339902','ACTIVE','속 추가',500,16),(36,'2023-11-16 11:06:57.158863','2023-11-16 11:06:57.158863','ACTIVE','해바라기 씨 추가',500,17),(37,'2023-11-16 11:06:57.160582','2023-11-16 11:06:57.160582','ACTIVE','수박 씨 추가',500,17),(38,'2023-11-16 11:08:14.793745','2023-11-16 11:08:14.793745','ACTIVE','호떡 클래스 - 1시간',50000,18),(39,'2023-11-16 11:08:14.795300','2023-11-16 11:08:14.795300','ACTIVE','호떡 클래스 - 2시간',70000,18),(40,'2023-11-16 11:09:06.798115','2023-11-16 11:09:06.798115','ACTIVE','고급 포장',500,19),(42,'2023-11-16 11:11:13.259228','2023-11-16 11:11:13.259228','ACTIVE','팥 곱빼기',200,20),(43,'2023-11-16 20:12:14.983989','2023-11-16 20:13:17.528990','INACTIVE','야채 많이 주세요',500,26),(44,'2023-11-16 20:13:45.392088','2023-11-16 20:17:11.611966','INACTIVE','야채 많이 주세요',800,27),(45,'2023-11-16 20:13:52.971521','2023-11-16 20:13:55.207822','INACTIVE','123',123,15),(48,'2023-11-16 20:17:33.836703','2023-11-16 20:17:33.836703','ACTIVE','야채 많이 주세요',100,29),(49,'2023-11-16 20:17:37.982284','2023-11-16 20:17:40.179500','INACTIVE','팥 많이 주세요',500,28),(50,'2023-11-16 22:08:03.364570','2023-11-16 22:08:03.364570','ACTIVE','씨앗많이',500,30),(51,'2023-11-16 22:08:11.995562','2023-11-16 22:08:11.995562','ACTIVE','꿀 완전 많이 넣어주세요',300,14);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `score` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FK74d12ba8sxxu9vpnc59b43y30` (`store_id`),
  CONSTRAINT `FK74d12ba8sxxu9vpnc59b43y30` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (25,'2023-11-16 10:46:42.139225','2023-11-16 10:46:42.139225','ACTIVE','맛있어요',65,4,11,8),(26,'2023-11-16 10:47:14.798580','2023-11-16 10:47:14.798580','ACTIVE','맛있어요~!~!',64,5,11,8),(27,'2023-11-16 11:21:48.787778','2023-11-16 11:21:48.787778','ACTIVE','여기 정말 맛있네요! ps. 골목대장 황재영',66,3,14,8),(28,'2023-11-16 21:40:21.835187','2023-11-16 21:40:21.835187','ACTIVE','맛이 딱히...',72,3,11,8),(29,'2023-11-16 22:34:52.855052','2023-11-16 22:34:52.855052','ACTIVE','붕어빵 너무 맛있어요...',2,5,10,11),(30,'2023-11-16 22:36:17.302603','2023-11-16 22:36:17.302603','ACTIVE','너무 맛있어서 한번 더 갔다 왔어요ㅎㅎ',3,5,10,11),(31,'2023-11-16 22:38:08.835959','2023-11-16 22:38:08.835959','ACTIVE','팥붕이 진리지',4,5,17,11),(32,'2023-11-16 22:38:59.255382','2023-11-16 22:38:59.255382','ACTIVE','슈붕도 맛있네용',5,5,17,11);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `store_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `active_area` varchar(255) DEFAULT NULL,
  `business_category` varchar(255) DEFAULT NULL,
  `category` enum('CHICKEN','CHINESEFOOD','DESSERT','EGGBREAD','ETC','FISHBREAD','GUGHWABREAD','HOTTEOK','KOREANFOOD','MEAT','SNACKBAR','STICK','SWEETPOTATO','TAKOYAKI','TOAST','WESTERNFOOD') DEFAULT NULL,
  `close_time` time(6) DEFAULT NULL,
  `information` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `lati` double NOT NULL,
  `longi` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `open_time` time(6) DEFAULT NULL,
  `owner_id` bigint DEFAULT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `state` enum('CLOSE','OPEN') DEFAULT NULL,
  `region_1depth_name` varchar(255) DEFAULT NULL,
  `region_2depth_name` varchar(255) DEFAULT NULL,
  `region_3depth_name` varchar(255) DEFAULT NULL,
  `region_4depth_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (8,'2023-11-16 10:00:26.498179','2023-11-16 22:26:36.105527','ACTIVE','부산광역시 강서구 송정동','푸드트럭','HOTTEOK','18:00:00.000000','','',35.09329221448336,128.85414216839686,'녹산 호떡 트럭','10:00:00.000000',25,'곽보선','010-1234-1234','OPEN','부산광역시','강서구','송정동',''),(11,'2023-11-16 10:51:25.840172','2023-11-17 08:56:05.443672','ACTIVE','부산광역시 강서구 송정동','포장마차','FISHBREAD','20:00:00.000000','붕어빵 맛집 붕붕어빵 입니다','부산 강서구에서 장사 하고 있습니다.',35.097459671169304,128.85800863435887,'붕붕어빵','10:00:00.000000',28,'강동윤','010-1011-1113','CLOSE','부산광역시','강서구','송정동',''),(12,'2023-11-16 11:02:43.413158','2023-11-16 21:13:12.761206','ACTIVE','부산광역시 강서구 송정동','푸드트럭','HOTTEOK','18:00:00.000000','','',35.08913630811187,128.85717288692075,'다양한 호떡을 맛보세요','09:00:00.000000',29,'구배성','010-0000-0000','OPEN','부산광역시','강서구','송정동',''),(13,'2023-11-16 11:10:42.339116','2023-11-16 21:39:55.610974','ACTIVE','부산광역시 강서구 송정동','푸드트럭','STICK','23:00:00.000000','','',35.09088376841549,128.8547290583927,'왕맛나닭꼬치','16:30:00.000000',30,'황재영','010-8765-5432','CLOSE','부산광역시','강서구','송정동','');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:46
CREATE DATABASE  IF NOT EXISTS `member` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `member`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: member
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `region_1depth_name` varchar(255) DEFAULT NULL,
  `region_2depth_name` varchar(255) DEFAULT NULL,
  `region_3depth_name` varchar(255) DEFAULT NULL,
  `region_4depth_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `grade` enum('CHAMPION','HEAVY','LIGHT','MIDDLE') DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` enum('GUEST','USER') DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `social_type` enum('KAKAO') DEFAULT NULL,
  `point_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_4lavkv07flx75gdqy2pa5yfl5` (`point_id`),
  CONSTRAINT `FK76aw7i47kl75mx3pijaaas3lg` FOREIGN KEY (`point_id`) REFERENCES `point` (`point_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (10,'부산광역시','강서구','송정동','','wodud9515@naver.com','c0Ok4wIiRfKIqfMYY67Gb7:APA91bGX4JY5GaJ1E3xZnWxX0c9H2ciqtEmDW9GhFPVhAVZ5LIfHQaBaUCUUyMfic1jKKih4s93xqCbeSpvddNNkq2jM4uJ0hmrRf_CbBG3eqvXLlyNE4u0oa584CtFUupT46bxVJF9W','HEAVY','','큐티','{bcrypt}$2a$10$eSuypy.4LZuMkUTgVemq/efFhikjNfFf7v8r8VsR/crNGo0ShZ/I.','010-5064-9515','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzOTEzODl9.PIhdoFon26WeRyKF-OIiTdgZ5pmFE_I8Vh36VSGdp4SrTb7WXcoWb92mqD6kyga1xGWdU9xl9veA-0sRlDnnMA','USER',NULL,NULL,10),(11,'부산광역시','강서구','송정동','','0214kbs@naver.com','0','LIGHT','','호떡이 조아요','{bcrypt}$2a$10$Yi7NcAYZ0W.VQSSQcTR76.0TIP9dvOfY9RQ4N9lCMPuSbJvusdnBC','010-1111-2222','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzODg5MzJ9.AodYtibp_rGvNa76NsWK1jw8gxA8ocyQ6IL4o43nlZ0jMVghh5-IrXQ2Q_28a2wt2eedMSOchmYQkgkT4nR3_A','USER',NULL,NULL,11),(13,'부산광역시','강서구','송정동','','deer980119@naver.com','cOBOnhjDRNKXQZlfckPwLC:APA91bGkorCrZethE6eLUKpU1LhSVE47gPSwgSfDCQ55wtfvju4Ehhch2u0b_7U3uByoc1M6fksu1nQo8mQyTkdGiohlv9oM2hmlC4Hkot9u4QVnTM9BFqflZSSfU8iXOSxPKSuDYfhA','LIGHT','','나는돼지입니다','{bcrypt}$2a$10$G4RxqsDrbEHyGcCw0yBe8e2VN/KaIY4zEAnRooOGq5.5OfCJmAqAm','010-0000-0000','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzNDU3ODR9.l8Ezo8JAoKXVZypc9nioObQ_cpv1yv1b6DI0FElBu1_OR6oeQQAgkZkTf6mupf8zv-R7NCFyic29naz0o5YBjg','USER',NULL,NULL,13),(14,'부산광역시','강서구','송정동','','slbin@naver.com','0','LIGHT','','골목대장황재영','{bcrypt}$2a$10$4kgRNtKjXeh8l6nCedDa4OL4IFT3NRoAqCrlEdBMVPQ5CIEwoFNMy','010-1234-1234','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzA3Mjl9.O4rSExVCbIVTib4GedSug2bXY1wBDpABHXvnmBiohvxASSuwc9qFvBC0pHwlyok-3K4G1O56-6QvPzMwG22LoA','USER',NULL,NULL,14),(15,'부산광역시','강서구','송정동','','test@test.com','0','LIGHT','','테스터','{bcrypt}$2a$10$9f.YlIwSEIy7JVw5C/NIuuT8H0TBeMBehkhixpPn7ZyTkYtAthWP6','010-1123-1234','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzNDQzNTF9.BLNQakRFjOZsVJF3WI6FhuX7FG13Ph1GYAQLKvpu7PArvpt3VPy8H0URgefeDAZq69eB6IvV30hgW1bZOhRrBA','USER',NULL,NULL,15),(16,'부산광역시','강서구','송정동','','test001@t.com','0','CHAMPION','','달달구리','{bcrypt}$2a$10$lPRLNIGQn4WHMqk83UFy.u0BPXuBDMvYm8UmxMlcXHfF/R7mcg2sS','010-1213-2132','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzODg2NjN9.CGH-CrRgN2EqL2F5neJKueh_4Aw2UDyFrlTyE4resXqpfyVFaOOtNHsfjaDhgilHoPALQ4Wf7Ya_xt6FGOhIFQ','USER',NULL,NULL,16),(17,'부산광역시','강서구','송정동','','test002@t.com','0','LIGHT','','꼬치꼬치','{bcrypt}$2a$10$b4eEQv6hp79M0otyFl2ctO5Xdb/in7ocpeIVlzhTQGaJp4lEbN0Xq','010-1010-1111','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzODkxOTd9.wmlJ16jY0j_iK-wUMK7oqlDgxauDBTK5IWyhlmH4ba_2U5zCIwvY94F3jK1it_nhV4ESFhe3Iyz3AUwteSXstw','USER',NULL,NULL,17),(18,'부산광역시','강서구','송정동','','kkp0639@ssafy.com','0','LIGHT','','팡표','{bcrypt}$2a$10$MAhB2356tVj5iOhhcwp3ZOOkdrDG/ZwpHI2tvV4i4F6CcbnqJOMK6','010-2961-5019','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzOTA5MjR9.UGLcOeFCKjmTkeInIT-RcNQ7l9k9FS7YBgULSXRyULYKSc07byIe09LSEhFIyY3WCwTCh41pWpabm7eA49F7zw','USER',NULL,NULL,18);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `point_id` bigint NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `payment_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`point_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` VALUES (10,858180,'383662'),(11,57800,'000000'),(12,0,'123456'),(13,990100,'123456'),(14,122282213,'000000'),(15,9000,'123456'),(16,90000,'000000'),(17,82000,'000000'),(18,0,'000605');
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` bigint NOT NULL AUTO_INCREMENT,
  `food_type` enum('CHICKEN','CHINESEFOOD','DESSERT','EGGBREAD','ETC','FISHBREAD','GUGHWABREAD','HOTTEOK','KOREANFOOD','MEAT','SNACKBAR','STICK','SWEETPOTATO','TAKOYAKI','TOAST','WESTERNFOOD') DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `FKr9m487rorwstnl1r1ib9r5pds` (`member_id`),
  CONSTRAINT `FKr9m487rorwstnl1r1ib9r5pds` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (176,'MEAT',14),(177,'CHICKEN',14),(178,'SNACKBAR',14),(179,'HOTTEOK',13),(185,'HOTTEOK',10),(186,'FISHBREAD',10),(187,'STICK',10),(188,'EGGBREAD',15),(189,'SNACKBAR',15),(190,'DESSERT',15),(195,'EGGBREAD',11),(196,'STICK',11),(197,'CHICKEN',11),(198,'HOTTEOK',17),(200,'KOREANFOOD',17),(201,'CHICKEN',17);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:48
CREATE DATABASE  IF NOT EXISTS `owner` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `owner`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9e205.p.ssafy.io    Database: owner
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  `owner_id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (25,'1234556787123',0,'카카오뱅크','0214kbs@naver.com','곽보선','{bcrypt}$2a$10$36BQgybNOmGeHTuEUkayWeI/yWRuiM1nUmf6.x3etITkn408FvR6O','010-1234-1234','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzODkxNjZ9.ihrubd30SD8UqL8P3NyKg0TGY4K6t57kKHf1GNlC5EV9ahfSwAukoMiesekcSNLGBLYwJVWEzHCsUbfzl5chBg',''),(28,'1134444665',0,'신한','qwe@qwe.com','강동윤','{bcrypt}$2a$10$HNtLLcoyfaYzul6Kgb4AiegDCgEUvgqA6WYEBMBNcUFeIfqCxrn0u','010-1011-1113','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzOTE5NTZ9.N88jT0a4dcPomcn7XA3U2pv7xwKhJ_3oZIafExAewlk6IbdZJFaN7YU1a6S92k8SDElbk5_MhYp03Fdeu7yGZQ','dDKELiA-RBi4S5gY_Ho613:APA91bG3bUZzTnW4TPo585i9t-joSAnv3xe2Krbwq9CvOYD3Y6lyjkc4Sj2EjSfKOvhcvp3FVCWma4Ov8cKIlPl_4xdxM6MYlhUGsPDfjOO2YB2RfQlnTWpI-e27Rq3K0Bl-n7PISImz'),(29,'0000000000000',0,'카카오뱅크','deer980119@naver.com','구배성','{bcrypt}$2a$10$2CQASS0EFpT9gNiNJE7Ak.MihKY8YKoKv9i16nRAD4C3GQ1Or950i','010-0000-0000','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzNDU4Mzl9.xZUJfkT546s-vUKDVdiUVYEBz1YGeOhba3aB9dTiDLlZa6OgmsnRUHCxGU_sM13c4apQS_YQBFZeZOmd7Gag_g','cOBOnhjDRNKXQZlfckPwLC:APA91bGkorCrZethE6eLUKpU1LhSVE47gPSwgSfDCQ55wtfvju4Ehhch2u0b_7U3uByoc1M6fksu1nQo8mQyTkdGiohlv9oM2hmlC4Hkot9u4QVnTM9BFqflZSSfU8iXOSxPKSuDYfhA'),(30,'1234',0,'국민은행','ghkd9999@naver.com','꼬치러버','{bcrypt}$2a$10$6qKygHuRePV7CvXLAWwrU.f4oo3KuTAXRnFvcAxdMb33TTGaiEIBm','010-8765-5432','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzNDcxMzV9.CAJsGa5YVgKz7qH8L1SibM4OzUEwMq56klVEKWhIgZnkCg2IxMN0cMHmdwcqSjXiJQMJmjfXxMYhDLd1CDrphg','c0Ok4wIiRfKIqfMYY67Gb7:APA91bGX4JY5GaJ1E3xZnWxX0c9H2ciqtEmDW9GhFPVhAVZ5LIfHQaBaUCUUyMfic1jKKih4s93xqCbeSpvddNNkq2jM4uJ0hmrRf_CbBG3eqvXLlyNE4u0oa584CtFUupT46bxVJF9W');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 10:09:48
