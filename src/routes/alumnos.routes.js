const { Router } = require("express");
const alumnosController = require("./controllers/alumnos.controller");

const router = Router();

// #/alumnos => GET             (Listado de alumnos)
router.get('/', alumnosController.getAlumnos);


// #/alumnos/{id} => GET        (Obtener un alumno por su id)
router.get('/:id', alumnosController.getAlumnoById);

// #/alumnos => POST            (Crear nuevo alumno)
router.post("/", alumnosController.createAlumno);

// #/alumnos/{id} => PUT        (Actualizar un alumno por su id)
router.put("/:id", alumnosController.updateAlumno);

// #/alumnos/{id} => DELETE     (Eliminar un alumno por su id)
router.delete("/:id", alumnosController.deleteAlumno);

module.exports = router;