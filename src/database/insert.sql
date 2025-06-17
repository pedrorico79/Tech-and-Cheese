-- Insert 10 states
INSERT INTO estado (nome, sigla) VALUES
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ'),
('Minas Gerais', 'MG'),
('Paraná', 'PR'),
('Santa Catarina', 'SC'),
('Rio Grande do Sul', 'RS'),
('Bahia', 'BA'),
('Goiás', 'GO'),
('Ceará', 'CE'),
('Pernambuco', 'PE');

-- Insert one city for each state (assuming IDs are auto-incremented from 1)
INSERT INTO cidade (nome, fkEstado) VALUES
('São Paulo', 1),        -- SP
('Rio de Janeiro', 2),   -- RJ
('Belo Horizonte', 3),   -- MG
('Curitiba', 4),         -- PR
('Florianópolis', 5),    -- SC
('Porto Alegre', 6),     -- RS
('Salvador', 7),         -- BA
('Goiânia', 8),          -- GO
('Fortaleza', 9),        -- CE
('Recife', 10);          -- PE

-- Insert some companies
INSERT INTO empresa (nome, cnpj) VALUES
('TechCheese Solutions', '12345678000101'),
('Global Innovations', '98765432000102'),
('Alpha Tech', '11223344000103');

-- Insert some job titles
INSERT INTO cargo (nome) VALUES
('CEO'),
('Gerente de Projeto'),
('Desenvolvedor'),
('Analista de Dados'),
('Técnico de Suporte');

-- Insert some users
INSERT INTO usuario (nome, sobrenome, email, senha, telefone_celular, fkEmpresa, fkCargo) VALUES
('João', 'Silva', 'joao.silva@techcheese.com', 'senha123', '11987654321', 1, 1), -- CEO TechCheese
('Maria', 'Santos', 'maria.santos@techcheese.com', 'senha456', '11998765432', 1, 3), -- Dev TechCheese
('Pedro', 'Oliveira', 'pedro.oliver@globalinnov.com', 'senha789', '21912345678', 2, 2), -- Gerente Global Innovations
('Ana', 'Costa', 'ana.costa@alphatech.com', 'senhaabc', '31901234567', 3, 4), -- Analista Alpha Tech
('Carlos', 'Ferreira', 'carlos.ferreira@techcheese.com', 'senhaxyz', '11976543210', 1, 5); -- Técnico TechCheese

-- Insert addresses for the companies
INSERT INTO endereco (fkEmpresa, logradouro, bairro, numero, cep, fkCidade) VALUES
(1, 'Rua da Tecnologia', 'Centro', '100', '01000000', 1), -- TechCheese (São Paulo)
(2, 'Av. Inovação', 'Jardins', '250', '20000000', 2),    -- Global Innovations (Rio de Janeiro)
(3, 'Travessa do Conhecimento', 'Savassi', '30', '30110000', 3); -- Alpha Tech (Belo Horizonte)

-- Insert sectors for companies
INSERT INTO setor (id, fkEmpresa, sigla) VALUES
(1, 1, 'A'), -- Setor A - TechCheese
(2, 1, 'B'), -- Setor B - TechCheese
(1, 2, 'X'), -- Setor X - Global Innovations
(1, 3, 'Y'); -- Setor Y - Alpha Tech

-- Insert sensor locations
INSERT INTO localSensor (localSensor, fkSetor, fkEmpresa) VALUES
('Servidores Principal', 1, 1),  -- TechCheese, Setor A
('Sala de Reuniões', 1, 1),     -- TechCheese, Setor A
('Produção', 2, 1),             -- TechCheese, Setor B
('Armazém Central', 1, 2),      -- Global Innovations, Setor X
('Escritório Administrativo', 1, 3); -- Alpha Tech, Setor Y

-- Insert sensors
INSERT INTO sensor (statusSensor, fkLocal) VALUES
('Ativo', 1), -- Sensor 1: Servidores Principal (TechCheese)
('Ativo', 1), -- Sensor 2: Servidores Principal (TechCheese)
('Ativo', 3), -- Sensor 3: Produção (TechCheese)
('Inativo', 4), -- Sensor 4: Armazém Central (Global Innovations)
('Ativo', 5); -- Sensor 5: Escritório Administrativo (Alpha Tech)

-- Insert measurements (using CURRENT_TIMESTAMP for dataHora)
INSERT INTO medicao (temperatura, statusTemperatura, umidade, statusUmidade, fkSensor) VALUES
(25.5, 'Normal', 60.0, 'Normal', 1),
(27.1, 'Atenção', 62.5, 'Normal', 2),
(22.0, 'Normal', 55.0, 'Normal', 3),
(30.2, 'Crítico', 70.1, 'Atenção', 4), -- Sensor Inativo, mas com medição para exemplo
(23.8, 'Normal', 58.7, 'Normal', 5);