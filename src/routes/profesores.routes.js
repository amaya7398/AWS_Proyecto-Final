const { Router } = require("express");
//const profesorController = require("./controllers/profesores.controller");

const router = Router();
// GET / profesores
//router.get("/", profesorController.getProfesores);
router.get("/", (req, res) => {
    resizeBy.json({ ok: true, msg: "getProfesores" })
});

/*
// GET / profesores / { id }
router.get("/:id", profesorController.getProfesorById);

// POST / profesores
router.post("/", profesorController.createProfesor);

// PUT / profesores / { id }
router.put("/:id", profesorController.updateProfesor);

// DELETE / profesores / { id }
router.delete("/:id", profesorController.deleteProfesor);
*/

module.exports = router;