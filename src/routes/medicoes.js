var express = require("express");
var router = express.Router();

var medicaoController = require("../controllers/medicaoController");

router.get("/historico", medicaoController.pegarHistorico);

module.exports = router;
