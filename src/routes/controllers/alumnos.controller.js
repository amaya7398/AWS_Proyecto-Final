let alumnos = [
    { id: 1, nombre: "Daniel", apellido: "Garcia", matricula: "123456", promedio: 9.5 },
    { id: 2, nombre: "Juan", apellido: "Perez", matricula: "123457", promedio: 8.5 },
];
const searchById = (id, arreglo) => {
    return arreglo.find(a => a.id == id);
}

module.exports.getAlumnos = (_, res) => {
    const dataAlumnos = alumnos.map(al => {
        const { nombre, apellido, matricula, promedio } = al;
        return { nombre, apellido, matricula, promedio };
    });
    res.status(200).json({
        alumnos: dataAlumnos
    });
}

module.exports.getAlumnoById = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        res.status(404).json({ "Error": "Not Found" });
    }
    res.status(200).json(alumnoFound);
}

module.exports.createAlumno = (req, res) => {
    const defaultID = alumnos.length + 1
    const { id = defaultID, nombre, apellido, promedio } = req.body;
    const exist = alumnos.find(al => al.nombre == nombre && al.apellido == apellido);
    if (exist) {
        return res.status(400).json({ "Error": "El alumno ya existe" });
    }
    alumnos.push({ id, nombre, apellido, promedio });
    res.status(201).json({ nombre, apellido, promedio });
}

module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Alumno not found" });
    }

    const {
        nombre = alumnoFound.nombre,
        apellido = alumnoFound.apellido,
        promedio = alumnoFound.promedio,
        matricula = alumnoFound.matricula } = req.body;
    console.log(alumnos[alumnos.indexOf(alumnoFound)]);
    res.status(200).json({ nombre, apellido, promedio, matricula });

}

module.exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Alumno not found" });
    }
    const newAlumnos = alumnos.filter(al => al.id != id);
    alumnos = newAlumnos;
    res.status(200).json({ "deleted": alumnoFound });

}

//module.exports = { getAlumnos }