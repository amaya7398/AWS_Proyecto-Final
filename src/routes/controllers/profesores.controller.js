let profesores = [];

const searchById = (id, arreglo) => {
    return arreglo.find(a => a.id == id);
}

module.exports.getProfesores = (_, res) => {
    const dataProfesores = profesores.map(prof => {
        const { numeroEmpleado, nombres, apellidos, horaClase } = prof;
        return { numeroEmpleado, nombres, apellidos, horaClase };
    });
    res.status(200).json({
        profesores: dataProfesores
    });
}

module.exports.getProfesorById = (req, res) => {
    const id = parseInt(req.params.id);
    const profesorFound = searchById(id, profesores);
    if (isNaN(id)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }
    if (!profesorFound) {
        return res.status(200).json({ "Error": "Profesor not found" });
    }
    const { numeroEmpleado, nombres, apellidos, horaClase } = profesorFound;
    return res.status(200).json({ numeroEmpleado, nombres, apellidos, horaClase });
}

module.exports.createProfesor = (req, res) => {
    const defaultID = profesores.length + 1;
    const { id = defaultID, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const exist = searchById(numeroEmpleado, profesores);
    if (numeroEmpleado == undefined || nombres == undefined || apellidos == undefined || horasClase == undefined) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }
    if (horasClase < 0) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }
    if (exist) {
        return res.status(400).json({ "Error": "El profesor ya existe" });
    }
    const newProfesor = { id, numeroEmpleado, nombres, apellidos, horasClase };
    profesores.push(newProfesor);
    res.status(201).json(newProfesor);
}

module.exports.updateProfesor = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    profesores[profesores.indexOf(profesorFound)] = { ...profesorFound, numeroEmpleado, nombres, apellidos, horasClase };
    res.status(200).json({ numeroEmpleado, nombres, apellidos, horasClase });
}

module.exports.deleteProfesor = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);
    if (!profesorFound) {
        return res.status(200).json({ "Error": "Profesor not found" });
    }
    const newProfesores = profesores.filter(prof => prof.id != id);
    profesores = newProfesores;
    res.status(200).json({ "deleted": profesorFound });

}