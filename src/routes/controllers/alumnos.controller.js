const { Alumno } = require("../../models/Alumno");

const searchById = async (id, WhereToSearch) => {
    return await WhereToSearch.findOne({ where: { id } });
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
    Alumno.findAll().then(alumnos => {
        res.status(200).json({ alumnos })
    });
}

module.exports.getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumnoFound = await searchById(id, Alumno);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Not Found" });
    }
    return res.status(200).json(alumnoFound);
}

module.exports.createAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    Alumno.create({ id, nombres, apellidos, matricula, promedio })
        .then(newAlumno => {
            return res.status(201).json(newAlumno);
        });
}

module.exports.uploadFotoPerfil = async (req, res) => {
    const { id } = req.params;
    const fileLocation = req.file.location;
    const status = await Student.update(
        {
            fotoPerfilUrl: fileLocation,
        },
        {
            where: {
                id: id,
            },
        }
    )
    if (status != 0) {
        const alumnoFound = await searchById(id, Alumno);
        if (!alumnoFound) {
            return res.status(404).json({ "Error": "Not Found" });
        }
        return res.status(200).json(alumnoFound);
    }
    res.status(500).json(alumnoFound);
}

module.exports.updateAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const alumnoFound = await searchById(id, Alumno);

    if (!alumnoFound) {
        return res.status(400).json({ "Error": "Alumno not found" });
    }
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    const alumnoEdited = await Alumno.update(
        { nombres, apellidos, matricula, promedio },
        { where: { id } }
    )
    return res.status(200).json(alumnoEdited);

}

module.exports.deleteAlumno = async (req, res) => {
    const { id } = req.params;
    const alumnoFound = await searchById(id, Alumno);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Alumno not found" });
    }
    await Alumno.destroy({ where: { id } })
    return res.status(200).json({ "deleted": alumnoFound })
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