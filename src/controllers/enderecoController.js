var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    var cidade = req.body.cidadeServer
    var cep = req.body.cepServer
    var logradouro = req.body.logradouroServer
    var bairro = req.body.bairroServer
    var numero = req.body.numeroServer
    var fkMineradora = req.body.fkMineradoraServer

    // Faça as validações dos valores
    if (cidade == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("O cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("O logradouro está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("O bairro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("O número está undefined!");
    } else if (fkMineradora == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    }

    enderecoModel.cadastrar(cidade, cep, logradouro, bairro, numero, fkMineradora)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar
};
