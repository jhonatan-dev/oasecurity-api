--ROLES
INSERT INTO roles (nombre) VALUES('Administrador');
INSERT INTO roles (nombre) VALUES('Cliente');

--USUARIO ADMINISTRADORES
INSERT INTO usuarios (id, dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, url_audio_grabacion, id_rol) VALUES(1, '67854321', 'Administrador', 'OA Security', 'oasecurity1@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/fotoadmin1.png', 'b622e1e8-09e7-4064-bb48-67b1b9bbd0ac', 'https://oasecurity-admin.com/audioadmin1.wav', 1);
INSERT INTO usuarios (id, dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, url_audio_grabacion, id_rol) VALUES(2, '12345678', 'Administrador', 'OA Security', 'oasecurity2@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/fotoadmin2.jpg', '518926da31862940b9de0017cc397bda', 'https://oasecurity-admin.com/audioadmin2.wav', 1);