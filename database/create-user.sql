CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;