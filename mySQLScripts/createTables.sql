CREATE DATABASE hackbotbi;
USE hachbotbi;

-- -- TABLA USUARIOS -- --
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, -- ID único y auto incrementable
    user_mail VARCHAR(255) NOT NULL UNIQUE, -- correo unico
    user_password VARCHAR(255) NOT NULL -- contraseña
);

