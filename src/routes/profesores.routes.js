const { Router } = require("express");
const profesorController = require("./controllers/profesores.controller");

const router = Router();

// GET / profesores
router.get("/", profesorController.getProfesores);
// POST / profesores
router.post("/", profesorController.createProfesor);


// GET / profesores / { id }
router.get("/:id", profesorController.getProfesorById);
// PUT / profesores / { id }
router.put("/:id", profesorController.updateProfesor);
// DELETE / profesores / { id }
router.delete("/:id", profesorController.deleteProfesor);

// Todo lo demás que no sea /profesores con [GET, POST] => 405
router.route("/").all(profesorController.methodNotAllowed);
// Todo lo demás que no sea /profesores/:id con [GET, PUT, DELETE] => 405
router.route("/:id").all(profesorController.methodNotAllowed);

module.exports = router;