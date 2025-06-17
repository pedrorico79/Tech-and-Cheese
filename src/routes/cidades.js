var express = require("express");
var router = express.Router();

var cidadeController = require("../controllers/cidadeController");

router.get("/buscar", function (req, res) {
    cidadeController.buscar(req, res);
});

module.exports = router;
