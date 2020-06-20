--ROLES
INSERT INTO roles (nombre) VALUES('Administrador');
INSERT INTO roles (nombre) VALUES('Cliente');

--USUARIO ADMINISTRADOR
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", image_face_id, url_foto_rostro, audio_profile_id, url_audio_grabacion, id_rol) VALUES('67854321', 'Administrador', 'OA Security', 'oasecurity@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', '949f129121408973b5b102ab26b8aee5', '949f129121408973b5b102ab26b8aee5.somehost.com', '518926da31862940b9de0017cc397bda', '518926da31862940b9de0017cc397bda.somehost.com', 1);