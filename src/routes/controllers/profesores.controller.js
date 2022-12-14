const { Profesor } = require('../../models/Profesor');

const searchById = async (id, ORM) => {
    return await ORM.findOne({ where: { id } });
}

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}

module.exports.getProfesores = (_, res) => {
    Profesor.findAll()
        .then(profesores => {
            res.status(200).json({ profesores })
        });
}

module.exports.getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesorFound = await searchById(id, Profesor);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    return res.status(200).json(profesorFound);
}

module.exports.createProfesor = (req, res) => {
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    if (!validParams(numeroEmpleado, nombres, apellidos, horasClase)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }

    Profesor.create({ numeroEmpleado, nombres, apellidos, horasClase })
        .then(newProfesor => {
            return res.status(201).json(newProfesor);
        });
}

module.exports.updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    const profesorFound = await searchById(id, Profesor);

    if (!profesorFound) {
        return res.status(400).json({ "Error": "Profesor not found" });
    }
    if (!validParams(numeroEmpleado, nombres, apellidos, horasClase)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }

    const profesorEdited = await Profesor.update(
        { numeroEmpleado, nombres, apellidos, horasClase },
        { where: { id } }
    )
    return res.status(200).json(profesorEdited);

}

module.exports.deleteProfesor = async (req, res) => {
    const { id } = req.params;
    const profesorFound = await searchById(id, Profesor);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Profesor not found" });
    }
    await Profesor.destroy({ where: { id } });
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