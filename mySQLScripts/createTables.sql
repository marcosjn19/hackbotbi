CREATE DATABASE hackbotbi;
USE hachbotbi;

-- -- TABLA USUARIOS -- --
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, -- ID único y auto incrementable
    user_mail VARCHAR(255) NOT NULL UNIQUE, -- correo unico
    user_password VARCHAR(255) NOT NULL -- contraseña
);


DROP TABLE clients;
-- -- TABLA CLIENTES -- --
CREATE TABLE clients (
	client_id INT AUTO_INCREMENT PRIMARY KEY,
    client_mail VARCHAR(255) NOT NULL UNIQUE,
    client_name VARCHAR(50) NOT NULL,
    client_lastname VARCHAR(50) NOT NULL,
    client_lat  DECIMAL(9,6) NOT NULL,
    client_long DECIMAL(9,6) NOT NULL,
    client_user VARCHAR(255) NOT NULL
);