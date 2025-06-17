
var cargoModel = require("../models/cargoModel");

function buscar(_, res){
    cargoModel.buscar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Nome = resultado.map(registro => registro.Nome);
                const Id = resultado.map(registro => registro.IdCargo);

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