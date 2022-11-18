const { Router } = require("express");
const profesorController = require("./controllers/profesores.controller");

const router = Router();
// GET / profesores
router.get("/", profesorController.getProfesores);


// GET / profesores / { id }
router.get("/:id", profesorController.getProfesorById);

// POST / profesores
router.post("/", profesorController.createProfesor);

// PUT / profesores / { id }
router.put("/:id", profesorController.updateProfesor);

// DELETE / profesores / { id }
router.delete("/:id", profesorController.deleteProfesor);

module.exports = router;