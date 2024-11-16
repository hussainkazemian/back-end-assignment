-- MariaDB dump 10.19-11.3.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mediasharingapp
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `comments_ibfk_1` (`media_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `mediaitems` (`media_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
(2,2,1,'Really nice video, thanks for sharing!','2024-11-06 11:56:07'),
(4,3,2,'This is a great photo! Well done!','2024-11-16 20:39:24'),
(5,3,2,'POST comments done!','2024-11-16 20:39:53'),
(6,3,2,'Good job!','2024-11-16 20:47:23');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `likes_ibfk_1` (`media_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `mediaitems` (`media_id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES
(2,2,1,'2024-11-06 11:56:07'),
(3,2,2,'2024-11-06 11:56:07'),
(4,3,1,'2024-11-06 11:56:07'),
(5,2,3,'2024-11-06 11:56:07'),
(6,3,3,'2024-11-06 11:56:07'),
(8,2,2,'2024-11-16 16:57:07'),
(9,1,2,'2024-11-16 20:25:01');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediaitems`
--

DROP TABLE IF EXISTS `mediaitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mediaitems` (
  `media_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filesize` int(11) NOT NULL,
  `media_type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`media_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `mediaitems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediaitems`
--

LOCK TABLES `mediaitems` WRITE;
/*!40000 ALTER TABLE `mediaitems` DISABLE KEYS */;
INSERT INTO `mediaitems` VALUES
(1,1,'sunset.jpg',1024,'image/jpeg','Sunset Image','An updated description of the sunset.','2024-11-06 11:56:07'),
(2,2,'sample.mp4',20480,'video/mp4','Sample Video','A sample video file','2024-11-06 11:56:07'),
(3,2,'ffd8.jpg',2048,'image/jpeg','Favorite food',NULL,'2024-11-06 11:56:07'),
(4,1,'2f9b.jpg',1024,'image/jpeg','Aksux and Jane','friends','2024-11-06 11:56:07'),
(5,1,'5eb024366884f42ade6c01c82709c445',759594,'image/png','sample',NULL,'2024-11-16 13:25:09'),
(6,1,'827fee280262844943c2e71251c517b1',1079863,'image/png','post tested',NULL,'2024-11-16 14:25:54'),
(7,1,'d53fb1e7556413fe09f6b748fa4e333f',1079863,'image/png','Updated Media Title to Updated','Updated description','2024-11-16 15:19:52'),
(8,1,'1731781024608-877046800-Screenshot 2024-11-14 190441.png',1079863,'image/png','POST test','Testig POST ','2024-11-16 18:17:04');
/*!40000 ALTER TABLE `mediaitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediaitemtags`
--

DROP TABLE IF EXISTS `mediaitemtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mediaitemtags` (
  `media_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`media_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `mediaitemtags_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `mediaitems` (`media_id`),
  CONSTRAINT `mediaitemtags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediaitemtags`
--

LOCK TABLES `mediaitemtags` WRITE;
/*!40000 ALTER TABLE `mediaitemtags` DISABLE KEYS */;
INSERT INTO `mediaitemtags` VALUES
(1,1),
(3,1),
(2,2),
(2,3),
(1,4);
/*!40000 ALTER TABLE `mediaitemtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating_value` int(11) NOT NULL CHECK (`rating_value` between 1 and 5),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rating_id`),
  KEY `media_id` (`media_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `mediaitems` (`media_id`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES
(1,1,2,5,'2024-11-06 11:56:07'),
(3,1,3,4,'2024-11-06 11:56:07'),
(4,1,2,4,'2024-11-16 17:15:41'),
(5,1,2,5,'2024-11-16 17:19:46'),
(6,3,2,5,'2024-11-16 20:55:04');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES
(1,'Nature'),
(2,'Video'),
(3,'Documentary'),
(4,'Landscape');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlevels`
--

DROP TABLE IF EXISTS `userlevels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlevels` (
  `level_id` int(11) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(50) NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlevels`
--

LOCK TABLES `userlevels` WRITE;
/*!40000 ALTER TABLE `userlevels` DISABLE KEYS */;
INSERT INTO `userlevels` VALUES
(1,'Admin'),
(2,'User'),
(3,'Guest');
/*!40000 ALTER TABLE `userlevels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_level_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_level_id` (`user_level_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_level_id`) REFERENCES `userlevels` (`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'noJogn','to-be-hashed-pw1','nojohn@metropolia.com',2,'2024-11-06 11:56:07'),
(2,'matrinlakso','to-be-hashed-pw2','martinlakso@metropolia.com',2,'2024-11-06 11:56:07'),
(3,'Anon5468','to-be-hashed-pw3','anon5468@example.com',2,'2024-11-06 11:56:07'),
(4,'AdminUser','to-be-hashed-pw4','adminuser@example.com',1,'2024-11-06 11:56:07'),
(5,'Hussain','pawwrods','hussainmar@metropolia.com',NULL,'2024-11-16 15:43:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 23:08:43
