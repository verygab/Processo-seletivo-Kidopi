-- Cria o banco de dados
CREATE DATABASE psel_kidopi;

-- Seleciona o banco de dados
USE psel_kidopi;

-- Cria o usuário
CREATE USER 'kidopi'@'localhost' IDENTIFIED BY 'T0T5u06K/qkhvM5b';

-- Concede permissões ao usuário para o banco de dados
GRANT ALL PRIVILEGES ON psel_kidopi.* TO 'kidopi'@'localhost';

-- Cria a tabela 'acesso'
CREATE TABLE `acesso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pais` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
