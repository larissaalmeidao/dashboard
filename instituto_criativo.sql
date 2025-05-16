create database instituto_criativo;
use instituto_criativo;

CREATE TABLE users(
	id int auto_increment primary key,
    name varchar(255) not null,
    tipo varchar(255) not null,
    telefone numeric(11) not null,
    cpf varchar(11) not null,
   	email varchar(255) not null unique,
	password varchar(255) not null
);

create table eventos(
	id int auto_increment primary key,
    nome varchar(255) not null,
    tipo varchar(255) not null,
    descricao varchar(255) not null,
    dataI date not null,
    horaI time not null,
    horaF time not null,
    cep numeric(8) not null,
    logradouro varchar(255) not null,
    numero varchar(255) not null,
    bairro varchar(255) not null,
    cidade varchar(255) not null,
    capacidade numeric(10) not null,
    responsavel varchar(255) not null
);

create table images(
	id int auto_increment primary key,
    filename varchar(255) not null,
    filepath varchar(255) not null,
    uploaded_at timestamp default current_timestamp
);

ALTER TABLE eventos 
ADD COLUMN imagemId INT NULL,
ADD CONSTRAINT fk_imagem FOREIGN KEY (imagemId) REFERENCES images(id);

INSERT INTO eventos (nome, tipo, descricao, dataI, horaI, horaF, cep, logradouro, numero, bairro, cidade, capacidade, responsavel) 
VALUES 
(
    'Tech Summit 2024', 
    'Presencial', 
    'Maior evento de tecnologia da América Latina com palestras sobre IA, cloud computing e inovação', 
    '2024-11-15', 
    '09:00:00', 
    '18:00:00', 
    04567000, 
    'Av. Paulista', 
    '1000', 
    'Bela Vista', 
    'São Paulo', 
    5000, 
    'Digital Future Inc.'
),
(
    'DevCon Brasil', 
    'Presencial', 
    'Evento para desenvolvedores com hands-on em novas linguagens e frameworks', 
    '2024-08-22', 
    '13:30:00', 
    '21:00:00', 
    20040001, 
    'Praça Mauá', 
    '1', 
    'Centro', 
    'Rio de Janeiro', 
    1200, 
    'Code Masters'
),
(
    'IA & Negócios', 
    'Online', 
    'Como aplicar inteligência artificial para otimizar resultados corporativos', 
    '2024-09-05', 
    '08:00:00', 
    '16:30:00', 
    30130005, 
    'Av. Afonso Pena', 
    '4000', 
    'Funcionários', 
    'Belo Horizonte', 
    800, 
    'NeuroTech Solutions'
);

create table fotoPerfil(
	id int auto_increment primary key,
    filename varchar(255) not null,
    filepath varchar(255) not null,
    uploaded_at timestamp default current_timestamp
);

ALTER TABLE users
ADD COLUMN imagemId INT NULL,
ADD CONSTRAINT fk_fotoPerfil FOREIGN KEY (imagemId) REFERENCES fotoPerfil(id);

select * from users;
select * from images;
select * from eventos;
select * from fotoPerfil;

DELETE FROM users 
WHERE id IN (3);


drop table users;