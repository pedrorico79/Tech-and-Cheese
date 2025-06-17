var cidadeModel = require("../models/cidadeModel");

function buscar(_, res){
    cidadeModel.buscar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Nome = resultado.map(registro => registro.Nome);
                const Id = resultado.map(registro => registro.IdCidade);

                res.json({
                    nome: Nome,
                    id: Id
                });
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscar
};
