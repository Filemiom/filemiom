CREATE DATABASE nvimd;
USE nvimd;


-- Tabela de lucros e custos
CREATE TABLE lucro_custos (
    mes INT PRIMARY KEY,
    lucro_bruto DECIMAL(10, 2),
    lucro_liquido DECIMAL(10, 2),
    custo_materia_prima DECIMAL(10, 2),
    custo_manutencao DECIMAL(10, 2),
    folha_pagamento DECIMAL(10, 2)
);

CREATE TABLE placa_video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    consumo_em_wats varchar (40) NOT NULL,
    chip VARCHAR(255) NOT NULL
    
);
CREATE TABLE funcionario (
    id INT auto_increment PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
  cpf varchar(40) NOT NULL,
  salario DECIMAL(10, 2)
);
CREATE TABLE placa_video_funcionario (
    id_funcionario INT,
    id_placa_video INT,
    data_associacao DATE,
    PRIMARY KEY(id_funcionario, id_placa_video),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id),
    FOREIGN KEY (id_placa_video) REFERENCES placa_video(id)
);

CREATE TABLE transportadora (
    id_transportadora INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW view_transportadoras AS
SELECT 
    id_transportadora,
    nome,
    telefone,
    email,
    cnpj,
    data_cadastro
FROM 
    transportadora
WHERE 
    data_cadastro >= DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELIMITER //

CREATE PROCEDURE cadastra_transportadora (
    IN p_nome VARCHAR(255),
    IN p_endereco VARCHAR(255),
    IN p_telefone VARCHAR(20),
    IN p_email VARCHAR(255),
    IN p_cnpj VARCHAR(18)
)
BEGIN
    -- Verifica se o CNPJ já está cadastrado
    IF EXISTS (SELECT 1 FROM transportadora WHERE cnpj = p_cnpj) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CNPJ já cadastrado!';
    ELSE
        -- Insere nova transportadora
        INSERT INTO transportadora (nome, endereco, telefone, email, cnpj)
        VALUES (p_nome, p_endereco, p_telefone, p_email, p_cnpj);
    END IF;
END //

DELIMITER ;

CREATE TABLE log_alteracao_transportadora (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_transportadora INT NOT NULL,
    campo_alterado VARCHAR(255),
    valor_anterior VARCHAR(255),
    valor_novo VARCHAR(255),
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_transportadora) REFERENCES transportadora(id_transportadora)
);

select * from usuario;


select * from placa_video;

INSERT INTO funcionario (id,nome, cpf, salario) VALUES
(1,'João Silva', 12345678901, 3500.00),
(2,'Maria Oliveira', 2345678, 4500.00),
(3,'Carlos Souza', 34567890123, 5500.00),
(4,'Ana Costa', 45678901234, 6000.00),
(5,'Pedro Santos', 56789012345, 4000.00);

INSERT INTO placa_video (nome, preco, consumo_em_wats, chip)
VALUES
('RXA 4090 ULTRA TI', 10499.99, '450W', 'NVIDIA'),
('RXA 4080 SUPER', 8799.99, '400W', 'NVIDIA'),
('RXA 4070 XT', 6299.99, '350W', 'NVIDIA'),
('RXA 4060 PRO', 4999.99, '300W', 'NVIDIA'),
('RXA 4050', 3299.99, '250W', 'NVIDIA');
ALTER TABLE placa_video ADD quantidade INT NOT NULL DEFAULT 0;
UPDATE placa_video 
SET quantidade = FLOOR(1+ RAND() * 5); -- Produção variada entre 100 e 1000 unidades

SELECT * FROM placa_video;
select * from funcionario;
select * from  placa_video_funcionario;