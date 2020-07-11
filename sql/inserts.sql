--ROLES
INSERT INTO roles (nombre) VALUES('Administrador');
INSERT INTO roles (nombre) VALUES('Cliente');

--APLICACIONES
INSERT INTO public.aplicaciones (nombre, url_login, jwt_secret) VALUES('Aplicación 1', 'https://cliente1.herokuapp.com/privado', 'APP_1');
INSERT INTO public.aplicaciones (nombre, url_login, jwt_secret) VALUES('Aplicación 2', 'https://cliente1.herokuapp.com/privado', 'APP_1');

--USUARIO ADMINISTRADORES OA SECURITY
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, audio_profile_status, url_audio_grabacion, id_rol, id_aplicacion) VALUES('67854321', 'Administrador', 'OA Security', 'oasecurity1@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/fotoadmin1.png', 'b622e1e8-09e7-4064-bb48-67b1b9bbd0ac', 'Enrolled', 'https://iaazurestorage.blob.core.windows.net/grabaciones/audioadmin1.wav', 1, NULL);
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, audio_profile_status, url_audio_grabacion, id_rol, id_aplicacion) VALUES('12345678', 'Administrador', 'OA Security', 'oasecurity2@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/fotoadmin2.jpg', '88f3ceba-6f0b-480b-a142-a684a0c0ac2c', 'Enrolled', 'https://iaazurestorage.blob.core.windows.net/grabaciones/audioadmin2.wav', 1, NULL);

--USUARIO ADMINISTRADORES CLIENTES
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, audio_profile_status, url_audio_grabacion, id_rol, id_aplicacion) VALUES('12345876', 'CARLOS', 'ESCOBAR MURO', 'empresa1@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/empresa1.png', 'c3ca9c76-690c-48b8-ad57-02567759482a', 'Enrolled', 'https://iaazurestorage.blob.core.windows.net/grabaciones/audioadmin1.wav', 1, 1);
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", url_foto_rostro, audio_profile_id, audio_profile_status, url_audio_grabacion, id_rol, id_aplicacion) VALUES('87612345', 'ROBERTO', 'GIMENEZ SANCHEZ', 'empresa2@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', 'https://iaazurestorage.blob.core.windows.net/rostros/empresa2.png', 'e52203a1-d521-45e5-a9b4-313e88fd8625', 'Enrolled', 'https://iaazurestorage.blob.core.windows.net/grabaciones/audioadmin2.wav', 1, 2);
