CREATE DATABASE IF NOT EXISTS studentDB;

USE studentDB;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);
