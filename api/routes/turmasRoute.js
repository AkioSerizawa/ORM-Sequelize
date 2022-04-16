const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router.get("/turmas", TurmaController.pegaTodasAsTurmas);
router.get("/turmas/:id", TurmaController.pegaUmaTurma);
router.post("/turmas", TurmaController.criaUmaTurma);
router.put("/turmas/:id", TurmaController.atualizaTurma);
router.delete("/turmas/:id", TurmaController.excluiTurma);

module.exports = router;
