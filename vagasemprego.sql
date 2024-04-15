-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/04/2024 às 01:10
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vagasemprego`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `candidato`
--

CREATE TABLE `candidato` (
  `cand_codigo` int(11) NOT NULL,
  `cand_cpf` varchar(14) NOT NULL,
  `cand_nome` varchar(100) DEFAULT NULL,
  `cand_endereco` varchar(255) DEFAULT NULL,
  `cand_telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `candidato`
--

INSERT INTO `candidato` (`cand_codigo`, `cand_cpf`, `cand_nome`, `cand_endereco`, `cand_telefone`) VALUES
(1, '32898375802', 'CARLOS MENEZES DOS SANTOS', 'RUA J SILVA, 78', '18991701191'),
(2, '40251426802', 'ELIZANGELA PEREIRA', 'RUA J SILVA, 78', '1899996666');

-- --------------------------------------------------------

--
-- Estrutura para tabela `candidato_vaga`
--

CREATE TABLE `candidato_vaga` (
  `insc_codigo` int(11) NOT NULL,
  `vaga_codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `inscricao`
--

CREATE TABLE `inscricao` (
  `insc_codigo` int(11) NOT NULL,
  `cand_codigo` int(11) NOT NULL,
  `data_inscricao` date NOT NULL,
  `horario_inscricao` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `vaga`
--

CREATE TABLE `vaga` (
  `vaga_codigo` int(11) NOT NULL,
  `vaga_cargo` varchar(100) DEFAULT NULL,
  `vaga_salario` decimal(10,2) DEFAULT NULL,
  `vaga_cidade` varchar(100) DEFAULT NULL,
  `vaga_quantidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `candidato`
--
ALTER TABLE `candidato`
  ADD PRIMARY KEY (`cand_codigo`);

--
-- Índices de tabela `candidato_vaga`
--
ALTER TABLE `candidato_vaga`
  ADD PRIMARY KEY (`insc_codigo`,`vaga_codigo`),
  ADD KEY `fk_vaga_codigo` (`vaga_codigo`);

--
-- Índices de tabela `inscricao`
--
ALTER TABLE `inscricao`
  ADD PRIMARY KEY (`insc_codigo`),
  ADD KEY `fk_candidato_codigo` (`cand_codigo`);

--
-- Índices de tabela `vaga`
--
ALTER TABLE `vaga`
  ADD PRIMARY KEY (`vaga_codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `candidato`
--
ALTER TABLE `candidato`
  MODIFY `cand_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `vaga`
--
ALTER TABLE `vaga`
  MODIFY `vaga_codigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `inscricao`
--
ALTER TABLE `inscricao`
  ADD CONSTRAINT `fk_candidato_codigo` FOREIGN KEY (`cand_codigo`) REFERENCES `candidato` (`cand_codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
