-- User creation examle, replace name and password with your own
-- real credentials are stored in a "secure" location (.env file)
CREATE USER 'user'@'localhost' IDENTIFIED BY 'userpass';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;