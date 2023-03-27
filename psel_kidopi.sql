-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27-Mar-2023 às 02:56
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `psel_kidopi`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `acesso`
--

CREATE TABLE `acesso` (
  `id` int(11) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `acesso`
--

INSERT INTO `acesso` (`id`, `pais`, `date`) VALUES
(1, 'brazil', '2023-03-26 11:54:39'),
(2, 'brazil', '2023-03-26 22:42:12'),
(3, 'brazil', '2023-03-26 22:43:11'),
(4, 'brazil', '2023-03-26 22:44:01'),
(5, 'brazil', '2023-03-26 22:46:57'),
(6, 'brazil', '2023-03-26 22:47:21'),
(7, 'brazil', '2023-03-26 22:47:24'),
(8, 'brazil', '2023-03-26 22:47:43'),
(9, 'brazil', '2023-03-26 22:48:49'),
(10, 'brazil', '2023-03-26 22:49:55'),
(11, 'brazil', '2023-03-26 22:57:28'),
(12, 'canada', '2023-03-26 22:57:33'),
(13, 'canada', '2023-03-26 22:57:35'),
(14, 'brazil', '2023-03-26 23:05:38'),
(15, 'brazil', '2023-03-26 23:05:42'),
(16, 'brazil', '2023-03-26 23:06:50'),
(17, 'brazil', '2023-03-26 23:06:50'),
(18, 'brazil', '2023-03-26 23:07:42'),
(19, 'canada', '2023-03-26 23:07:42'),
(20, 'brazil', '2023-03-26 23:08:15'),
(21, 'canada', '2023-03-26 23:08:15'),
(22, 'brazil', '2023-03-26 23:08:59'),
(23, 'canada', '2023-03-26 23:08:59'),
(24, 'brazil', '2023-03-26 23:09:34'),
(25, 'canada', '2023-03-26 23:09:34'),
(26, 'brazil', '2023-03-26 23:10:25'),
(27, 'canada', '2023-03-26 23:10:25'),
(28, 'brazil', '2023-03-26 23:12:51'),
(29, 'canada', '2023-03-26 23:12:51'),
(30, 'brazil', '2023-03-26 23:15:01'),
(31, 'canada', '2023-03-26 23:15:01'),
(32, 'brazil', '2023-03-26 23:17:18'),
(33, 'brazil', '2023-03-26 23:23:50'),
(34, 'canada', '2023-03-26 23:23:50'),
(35, 'brazil', '2023-03-26 23:30:08'),
(36, 'canada', '2023-03-26 23:30:08'),
(37, 'brazil', '2023-03-26 23:30:51'),
(38, 'canada', '2023-03-26 23:30:51'),
(39, 'brazil', '2023-03-26 23:35:23'),
(40, 'canada', '2023-03-26 23:35:23'),
(41, 'brazil', '2023-03-26 23:51:46'),
(42, 'canada', '2023-03-26 23:51:46'),
(43, 'brazil', '2023-03-26 23:52:24'),
(44, 'canada', '2023-03-26 23:52:24'),
(45, 'brazil', '2023-03-26 23:53:24'),
(46, 'canada', '2023-03-26 23:53:24'),
(47, 'brazil', '2023-03-26 23:53:50'),
(48, 'canada', '2023-03-26 23:53:50'),
(49, 'brazil', '2023-03-26 23:58:36'),
(50, 'canada', '2023-03-26 23:58:36'),
(51, 'brazil', '2023-03-26 23:59:29'),
(52, 'canada', '2023-03-26 23:59:29'),
(53, 'brazil', '2023-03-27 00:01:05'),
(54, 'canada', '2023-03-27 00:01:05'),
(55, 'brazil', '2023-03-27 00:01:11'),
(56, 'canada', '2023-03-27 00:01:11'),
(57, 'brazil', '2023-03-27 00:01:56'),
(58, 'canada', '2023-03-27 00:01:56'),
(59, 'brazil', '2023-03-27 00:06:42'),
(60, 'canada', '2023-03-27 00:06:42'),
(61, 'brazil', '2023-03-27 00:08:16'),
(62, 'canada', '2023-03-27 00:08:16'),
(63, 'brazil', '2023-03-27 00:09:29'),
(64, 'canada', '2023-03-27 00:09:29'),
(65, 'brazil', '2023-03-27 00:09:44'),
(66, 'canada', '2023-03-27 00:09:45'),
(67, 'belize', '2023-03-27 00:41:01'),
(68, 'france', '2023-03-27 00:41:01'),
(69, 'brazil', '2023-03-27 00:45:32'),
(70, 'brazil', '2023-03-27 00:46:52'),
(71, 'brazil', '2023-03-27 00:47:34'),
(72, 'brazil', '2023-03-27 00:48:25'),
(73, 'brazil', '2023-03-27 00:48:36'),
(74, 'brazil', '2023-03-27 00:48:48'),
(75, 'belarus', '2023-03-27 00:52:58'),
(76, 'afghanistan', '2023-03-27 00:52:58');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `acesso`
--
ALTER TABLE `acesso`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acesso`
--
ALTER TABLE `acesso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
