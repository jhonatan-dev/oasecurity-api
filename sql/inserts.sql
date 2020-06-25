--ROLES
INSERT INTO roles (nombre) VALUES('Administrador');
INSERT INTO roles (nombre) VALUES('Cliente');

--USUARIO ADMINISTRADORES
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", image_face_id, url_foto_rostro, audio_profile_id, url_audio_grabacion, id_rol) VALUES('67854321', 'Administrador', 'OA Security', 'oasecurity1@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', '58a83267-ac29-4d50-8072-5ea4a86414e2', 'https://oasecurity-admin.com/fotoadmin1.jpg', '798926da31862940b9de1234cc397bda', 'https://oasecurity-admin.com/audioadmin1.jpg', 1);
INSERT INTO usuarios (dni, nombres, apellidos, email, "password", image_face_id, url_foto_rostro, audio_profile_id, url_audio_grabacion, id_rol) VALUES('12345678', 'Administrador', 'OA Security', 'oasecurity2@hotmail.com', '$2a$10$PZp7S3G8li32fo6QUsiRN.41/jHk4v6n5Hs8gXKYI7kyhG1N2wK2W', '99dae74c-deb4-40da-a8ce-03d60e7886fd', 'https://oasecurity-admin.com/fotoadmin2.jpg', '518926da31862940b9de0017cc397bda', 'https://oasecurity-admin.com/audioadmin2.jpg', 1);