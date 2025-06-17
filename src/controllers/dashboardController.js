
var dashboardModel = require("../models/dashboardModel");

function riscoDeExplosao(_, res) {
    dashboardModel.riscoDeExplosao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Sigla = resultado.map(registro => registro.sigla);

                res.json({
                    sigla: Sigla,
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

function evacuacaoTotal(_, res) {
    dashboardModel.evacuacaoTotal()
        .then(function (resultado) {
            if (resultado.length > 0) {
                const Sigla = resultado.map(registro => registro.sigla);

                res.json({
                    sigla: Sigla,
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

// ... outras funções do controller

function visaoGeral(_, res) {
    dashboardModel.visaoGeral()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado); 
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
    riscoDeExplosao,
    evacuacaoTotal,
    visaoGeral
};