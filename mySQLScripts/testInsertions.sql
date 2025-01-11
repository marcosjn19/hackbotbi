USE hackbotbi;

INSERT INTO users (user_mail, user_password)
VALUES ('johndoe@mail.com', 'password');

INSERT INTO clients (client_mail, client_name, client_lastname, client_lat, client_long, client_user) 
VALUES 
('janedoe@mail.com', 'Jane', 'Doe', 37.774929, -122.419416, 'johndoe@mail.com'),
('johnydoe@mail.com', 'Johny', 'Doe', 40.712776, -74.005974, 'johndoe@mail.com'),
('marcosj@mail.com', 'Marcos', 'Juarez', 34.052235, -118.243683, 'johndoe@mail.com');

SELECT * FROM users;

SELECT * FROM clients;
DELETE FROM users WHERE user_mail = 'janedoe@mail.com';

DELETE FROM clients WHERE client_mail = 'marcos@correo.com';