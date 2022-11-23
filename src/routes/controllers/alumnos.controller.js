let alumnos = [];
const searchById = (id, arreglo) => {
    return arreglo.find(a => a.id == id);
}
const esPromedioCorrecto = promedio => (promedio > 0 && promedio <= 100);
const invalidParams = (nombre, apellido, matricula, promedio) => {
    return !nombre || !apellido || !matricula || !promedio;
    //|| nombre == "" || apellido == "" || matricula == "" || promedio == "";
}

module.exports.getAlumnos = (_, res) => {
    const dataAlumnos = alumnos.map(al => {
        const { nombre, apellido, matricula, promedio } = al;
        return { nombre, apellido, matricula, promedio };
    });
    return res.status(200).json({
        alumnos: dataAlumnos
    });
}

module.exports.getAlumnoById = (req, res) => {
    const { id } = parseInt(req.params);
    const alumnoFound = searchById(id, alumnos);
    if (isNaN(id)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }
    if (!alumnoFound) {
        return res.status(400).json({ "Error": "Not Found" });
    }
    const { nombre, apellido, matricula, promedio } = alumnoFound;
    return res.status(200).json({ nombre, apellido, matricula, promedio });
}

module.exports.createAlumno = (req, res) => {
    const defaultID = alumnos.length + 1;
    const { id = defaultID, nombre, apellido, matricula, promedio } = req.body;
    const exist = searchById(matricula, alumnos);
    if (invalidParams(nombre, apellido, matricula, promedio)) {
        return res.status(201).json({ "Error": "Invalid Parameters undefined" });
    }
    if (!esPromedioCorrecto(promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters promedio" });
    }
    if (exist) {
        return res.status(400).json({ "Error": "El alumno ya existe" });
    }
    const newAlumno = { id, nombre, apellido, matricula, promedio };
    alumnos.push(newAlumno);
    return res.status(201).json(newAlumno);
}

module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(201).json({ "Error": "Alumno not found" });
    }
    const {
        nombre = alumnoFound.nombre,
        apellido = alumnoFound.apellido,
        promedio = alumnoFound.promedio,
        matricula = alumnoFound.matricula } = req.body;
    alumnos[alumnos.indexOf(alumnoFound)] = { ...alumnoFound, nombre, apellido, promedio, matricula };
    return res.status(201).json({ nombre, apellido, promedio, matricula });

}

module.exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(201).json({ "Error": "Alumno not found" });
    }
    const newAlumnos = alumnos.filter(al => al.id != id);
    alumnos = newAlumnos;
    return res.status(201).json({ "deleted": alumnoFound });
}

//module.exports = { getAlumnos }