
var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id as id, nome as Nome from usuario where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, telefone, senha, fkCargo, fkEmpresa) {
    var instrucaoSql = `
        insert into usuario (nome, sobrenome, email, senha, telefone_celular, fkEmpresa, fkCargo) values 
        ('${nome}', '${sobrenome}', '${email}', '${senha}', '${telefone}', ${fkEmpresa}, ${fkCargo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar_suporte(email, senha){
    var instrucaoSql = `
        select id as Id, nome as Nome from minetech_funcionario where email = '${email}' and senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    autenticar_suporte
};
