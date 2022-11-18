const profesores = [
    { id: 1, numeroEmpleado: 1, nombres: "Juan", apellidos: "Perez", horasClase: 10 },
    { id: 2, numeroEmpleado: 2, nombres: "Maria", apellidos: "Gomez", horasClase: 20 },
]
module.exports.getProfesores = (_, res) => {
    const dataProfesores = profesores.map(prof => {
        const { numeroEmpleado, nombres, apellidos, horaClase } = prof;
        return { numeroEmpleado, nombres, apellidos, horaClase };
    })
    res.status(200).json({ profesores: dataProfesores });
}

module.exports.getProfesorById = (req, res) => {
    const { id } = req.params;
    const profesorFound = profesores.find(prof => prof.id == id);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    res.status("200").json(profesorFound);
}

module.exports.createProfesor = (req, res) => {
    const defaultID = profesores.length + 1;
    const { id = defaultID, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const exist = profesores.find(prof => prof.numeroEmpleado == numeroEmpleado);
    if (exist) {
        return res.status(400).json({ "Error": "El profesor ya existe" });
    }
    const newProfesor = { id, numeroEmpleado, nombres, apellidos, horasClase };
    profesores.push(newProfesor);
    res.status(201).json(newProfesor);
}

module.exports.updateProfesor = () => { }

module.exports.deleteProfesor = () => { }