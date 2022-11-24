let profesores = [];

const searchById = (id, arreglo) => {
    return arreglo.find(a => a.id == id);
}

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}

module.exports.getProfesores = (_, res) => {
    res.status(200).json({ profesores });
}

module.exports.getProfesorById = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);

    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    return res.status(200).json(profesorFound);
}

module.exports.createProfesor = (req, res) => {
    const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const exist = searchById(numeroEmpleado, profesores);
    if (!validParams(numeroEmpleado, nombres, apellidos, horasClase)) {
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
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const profesorFound = searchById(id, profesores);

    if (!profesorFound) {
        return res.status(400).json({ "Error": "Profesor not found" });
    }
    if (!validParams(numeroEmpleado, nombres, apellidos, horasClase)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }

    profesores[profesores.indexOf(profesorFound)] = { ...profesorFound, numeroEmpleado, nombres, apellidos, horasClase };
    res.status(200).json({ id, numeroEmpleado, nombres, apellidos, horasClase });
}

module.exports.deleteProfesor = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    profesores = profesores.filter(prof => prof.id != id);
    res.status(200).json({ "deleted": profesorFound });
}

// VALIDAR INFORMACION AL CAMBIAR O CREAR UN PROFESOR
const validParams = (numeroEmpleado, nombres, apellidos, horasClase) => {
    return testValidNumberWorker(numeroEmpleado) &&
        testValidNames(nombres) &&
        testValidNames(apellidos) &&
        testValidHours(horasClase);
};

const testValidNames = (str) => {
    const regexNames = new RegExp(/^[a-zA-ZÀ-ÿ ]+/)
    return (str != null && regexNames.test(str));
};
const testValidNumberWorker = (str) => {
    const regexNumberWorker = new RegExp(/^\d+/);
    return (str != null && regexNumberWorker.test(str));
};
const testValidHours = (hours) => {
    return hours != null && hours >= 0;
};