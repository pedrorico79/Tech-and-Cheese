// Importa o modelo que criamos
var medicaoModel = require("../models/medicaoModel");

// Função que vai ser chamada quando alguém acessar a rota
function pegarHistorico(req, res) {
    
    // Chama a função do modelo para buscar no banco
    medicaoModel.buscarHistorico()
        .then(function (resultado) {
            // Se deu certo e tem dados
            if (resultado.length > 0) {
                res.json(resultado); // Envia os dados como JSON
            } else {
                res.status(204).send("Nenhum dado encontrado");
            }
        })
        .catch(function (erro) {
            // Se deu erro
            console.log("Erro:", erro);
            res.status(500).send("Erro no servidor");
        });
}

// Exporta a função
module.exports = {
    pegarHistorico
};
