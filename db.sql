 CREATE DATABASE TIMESLICE;
USE TIMESLICE;
CREATE TABLE users(
   id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(50) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   fullname VARCHAR(100) NOT NULL,
   dob DATE NOT NULL
 );