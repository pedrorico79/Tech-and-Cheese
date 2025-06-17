var database = require("../database/config")

// Função auxiliar para pegar o último status de cada setor
function getUltimoStatusPorSetor() {
    const instrucaoSql = `
        WITH UltimoStatus AS (
            SELECT
                se.sigla,
                m.statusnivel,
                ROW_NUMBER() OVER(PARTITION BY se.id ORDER BY m.id DESC) as rn
            FROM medicao m
            INNER JOIN sensor s ON m.fkSensor = s.id
            INNER JOIN localSensor ls ON s.fkLocal = ls.id
            INNER JOIN setor se ON se.id = ls.fkSetor
        )
        SELECT sigla, statusnivel FROM UltimoStatus WHERE rn = 1;
    `;
    return database.executar(instrucaoSql);
}

function riscoDeExplosao() {
    var instrucaoSql = `
    WITH ultimos5 AS (
 SELECT m.id, m.statusnivel, se.sigla
 FROM medicao m
 INNER JOIN sensor s ON m.fkSensor = s.id
 INNER JOIN localSensor ls ON s.fkLocal = ls.id
 INNER JOIN setor se ON se.id = ls.fkSetor
 ORDER BY m.id DESC
 LIMIT 5

)
SELECT sigla

FROM ultimos5

WHERE statusnivel = 'Risco de Explosão'

AND EXISTS (
 SELECT 1 FROM ultimos5 WHERE statusnivel = 'Risco de Explosão'

);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function evacuacaoTotal() {
    var instrucaoSql = `
WITH ultimos5 AS (
 SELECT m.id, m.statusnivel, se.sigla, m.nivelMetano
 FROM medicao m
 INNER JOIN sensor s ON m.fkSensor = s.id
 INNER JOIN localSensor ls ON s.fkLocal = ls.id
 INNER JOIN setor se ON se.id = ls.fkSetor
 ORDER BY m.id DESC
 LIMIT 5
)
SELECT sigla
FROM ultimos5
WHERE nivelMetano > 2
AND EXISTS (
 SELECT 1 FROM ultimos5 WHERE nivelMetano > 2
);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// A função visaoGeral que você já tinha estava correta
function visaoGeral() {
    var instrucaoSql = `
        WITH UltimaMedicaoPorSetor AS (
            SELECT
                m.nivelMetano,
                m.dataHora,
                se.sigla AS SiglaSetor,
                ROW_NUMBER() OVER(PARTITION BY se.id ORDER BY m.id DESC) as rn
            FROM medicao m
            INNER JOIN sensor s ON m.fkSensor = s.id
            INNER JOIN localSensor ls ON ls.id = s.fkLocal
            INNER JOIN setor se ON se.id = ls.fkSetor
        )
        SELECT
            nivelMetano,
            CONCAT(EXTRACT(HOUR FROM dataHora), ':',
                   EXTRACT(MINUTE FROM dataHora), ':',
                   EXTRACT(SECOND FROM dataHora)) AS Hora,
            SiglaSetor
        FROM UltimaMedicaoPorSetor
        WHERE rn = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getUltimoStatusPorSetor, 
    riscoDeExplosao,
    evacuacaoTotal,
    visaoGeral
};