var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        usuarioModel.autenticar_suporte(email, senha)
                        .then(
                            function (resultadoAutenticar) {
                                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);
            
                                if (resultadoAutenticar.length == 1) {
                                    res.json(resultadoAutenticar[0]);
                                } else if (resultadoAutenticar.length == 0) {
                                    console.log('Usuário não encontrado')
                                    res.status(401).send("Usuário não encontrado!");
                                } else {
                                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                                }
                            }
                        )
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeFuncionarioServer;
    var sobrenome = req.body.sobrenomeFuncionarioServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaFuncServer;
    var fkCargo = req.body.cargoServer;
    var fkEmpresa = req.body.FkEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkCargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    }

    usuarioModel.cadastrar(nome, sobrenome, email, telefone, senha, fkCargo, fkEmpresa)
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
    autenticar,
    cadastrar
}