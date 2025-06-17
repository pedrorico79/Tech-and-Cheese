
// Aqui é onde fazemos a consulta no banco de dados
var database = require("../database/config");

// Função que busca os dados no banco
function buscarHistorico() {
    
    // Aqui escrevemos o SQL - junta as tabelas para pegar os dados
    var sql = `
        SELECT 
            DATE_FORMAT(m.dataHora, '%d/%m/%Y') as data,
            DATE_FORMAT(m.dataHora, '%H:%i') as horario,
            s.sigla as setor,
            sen.id as idSensor,
            m.nivelMetano as valor
        FROM medicao m
        JOIN sensor sen ON m.fkSensor = sen.id
        JOIN localSensor ls ON sen.fkLocal = ls.id
        JOIN setor s ON ls.fkSetor = s.id
        ORDER BY m.dataHora DESC;
    `;
    
    // Executa a consulta no banco
    return database.executar(sql);
}

// Exporta a função para usar em outros arquivos
module.exports = {
    buscarHistorico
};
