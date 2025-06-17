
var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.post("/buscarPeloNome", function (req, res) {
    empresaController.buscarPeloNome(req, res);
});

router.post("/buscarPeloCnpj", function (req, res) {
    empresaController.buscarPeloCnpj(req, res);
});

module.exports = router;
