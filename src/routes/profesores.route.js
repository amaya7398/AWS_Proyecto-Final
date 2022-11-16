const { Router } = required("express");
const profesorController = require("./controllers/profesores.controller.js");

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