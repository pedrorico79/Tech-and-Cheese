var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/riscodeexplosao", function (req, res) {
    dashboardController.riscoDeExplosao(req, res);
});

router.get("/evacuacaototal", function (req, res) {
    dashboardController.evacuacaoTotal(req, res);
});

router.get("/visaogeral", function (req, res) {
    dashboardController.visaoGeral(req, res);
});

module.exports = router;
