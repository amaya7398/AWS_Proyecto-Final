const express = require("express");
const cors = require("cors");
const routeMain = require("./routes/main.routes");
const routeAlumnos = require("./routes/alumnos.routes");
const routeProfesores = require("./routes/profesores.routes");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//As "Morgana" middleware
app.use((req, _, next) => {
    console.log(req.method, "=> ", req.url);
    next();
})

//ROUTES
app.use("/", routeMain);
app.use("/alumnos", routeAlumnos);
app.use("/profesores", routeProfesores);

// 200 ok || La solicitud ha tenido éxito.
// 201 Created || Se ha creado un nuevo recurso como resultado.
// 404 not found || El servidor no pudo encontrar el contenido solicitado.
// 500 internal server error || El servidor encontró una condición inesperada que le impide cumplir con la solicitud.

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("server running on port", port);
});
