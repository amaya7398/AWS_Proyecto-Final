let alumnos = [];
const searchById = (id, arreglo) => {
    return arreglo.find(a => a.id == id);
}
const validParams = (id, nombre, apellido, matricula, promedio) => {
    return testValidID(id) &&
        testValidNames(nombre) &&
        testValidNames(apellido) &&
        testValidMatricula(matricula) &&
        testValidAverage(promedio);
}

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}

module.exports.getAlumnos = (_, res) => {
    res.status(200).json({ alumnos });
}

module.exports.getAlumnoById = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Not Found" });
    }
    return res.status(200).json(alumnoFound);
}

module.exports.createAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const exist = searchById(matricula, alumnos);
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }
    if (exist) {
        return res.status(400).json({ "Error": "Alumno already exist" });
    }
    const newAlumno = { id, nombres, apellidos, matricula, promedio };
    alumnos.push(newAlumno);
    return res.status(201).json(newAlumno);
}

module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const alumnoFound = searchById(id, alumnos);

    if (!alumnoFound) {
        return res.status(400).json({ "Error": "Alumno not found" });
    }
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    alumnos[alumnos.indexOf(alumnoFound)] = { ...alumnoFound, nombres, apellidos, promedio, matricula };
    return res.status(200).json(alumnoFound);

}

module.exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Alumno not found" });
    }
    alumnos = alumnos.filter(al => al.id != id);
    return res.status(200).json({ "deleted": alumnoFound });
}

//module.exports = { getAlumnos }

const testValidID = (idToValidate) => {
    const regexParaId = new RegExp(/^[0-9]/);
    return regexParaId.test(idToValidate) ? idToValidate > 0 : false;
}
const testValidNames = (textoToValidate) => {
    const regexParaTexto = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
    return textoToValidate != null ? regexParaTexto.test(textoToValidate) : false;
}
const testValidMatricula = (matriculaToValidate) => {
    const regexParaMatricula = new RegExp(/^A[0-9]/);
    return matriculaToValidate != null ? regexParaMatricula.test(matriculaToValidate) : false;
}
const testValidAverage = (averageToValidate) => {
    return !isNaN(averageToValidate) ? averageToValidate > 0 : false;
}