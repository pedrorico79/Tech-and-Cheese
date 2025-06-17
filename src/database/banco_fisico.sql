create database techandcheese;
use techandcheese;

create table estado(
		id int not null auto_increment,
        nome varchar(45) not null,
        sigla char(2),
        primary key (id)
);

create table cidade(
		id int not null auto_increment,
        nome varchar(45) not null,
        fkEstado int,
        primary key (id)
);

create table endereco(
        fkEmpresa int not null,
        logradouro varchar(45),
        bairro varchar(45),
        numero varchar(10),
        cep varchar(8),
        fkCidade int,
        primary key(fkEmpresa)
);

create table empresa(
		id int not null auto_increment,
        nome varchar(50),
        cnpj char(14) unique,
        primary key (id)
);

create table cargo(
		id int not null auto_increment,
        nome varchar(45),
        primary key(id)
);

create table usuario(
		id int not null auto_increment,
        nome varchar(45),
        sobrenome varchar(45),
        email varchar(100),
        senha varchar(50),
        telefone_celular char(11),
        fkEmpresa int,
        fkCargo int,
        primary key (id)
);

create table setor(
	id int not null,
    fkEmpresa int not null,
    sigla char(1),
    primary key(id, fkEmpresa)
);

create table localSensor(
		id int not null auto_increment,
        localSensor varchar(45),
        fkSetor int not null,
        fkEmpresa int not null,
        primary key(id)
);

create table sensor(
		id int not null auto_increment,
        statusSensor varchar(45),
		fkLocal int not null,
		primary key(id)
);

create table medicao(
		id int not null auto_increment,
        temperatura decimal(5,2),
        statusTemperatura varchar(45),
        umidade decimal(5,2),
        statusUmidade varchar(45),
        dataHora timestamp default CURRENT_TIMESTAMP,
        fkSensor int not null,
        primary key(id)
);

alter table cidade add constraint fk_cidade_estado foreign key (fkEstado) references estado(id);

alter table endereco add constraint fk_endereco_empresa foreign key (fkEmpresa) references empresa(id);
alter table endereco add constraint fk_endereco_cidade foreign key (fkCidade) references cidade(id);

alter table usuario add constraint fk_usuario_empresa foreign key (fkEmpresa) references empresa(id);
alter table usuario add constraint fk_usuario_cargo foreign key (fkCargo) references cargo(id);

alter table setor add constraint fk_setor_empresa foreign key (fkEmpresa) references empresa(id);

alter table localSensor add constraint fk_local_setor foreign key(fkSetor) references setor(id);
alter table localSensor add constraint fk_local_empresa foreign key (fkEmpresa) references setor(fkEmpresa);

alter table sensor add constraint fk_sensor_local foreign key (fkLocal) references localSensor(id);

alter table medicao add constraint fk_medicao_sensor foreign key (fkSensor) references sensor(id);


