var database = require("../database/config")

function cadastrar(cidade, cep, logradouro, bairro, numero, fkMineradora) {
    var instrucaoSql = `

        insert into endereco (fkMineradora, logradouro, bairro, numero, cep, fkCidade) values (${fkMineradora}, '${logradouro}', '${bairro}', ${numero}, ${cep}, ${cidade})
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
