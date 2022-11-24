const express = require("express");
const cors = require("cors");
const routeAlumnos = require("./routes/alumnos.routes");
const routeProfesores = require("./routes/profesores.routes");
const app = express();

const validPath = (req) => {
    const reqq = ["/alumnos", "/profesores"];
    return reqq.includes(req.url);
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
app.use("/alumnos", routeAlumnos);
app.use("/profesores", routeProfesores);
// Middleware for 404 
app.use((req, res, next) => {
    if (!validPath(req)) {
        res.status(404).json({
            "Error": { "Path not allowed": req.url }
        });
    }
    next();
})

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("server running on port", port);
});

// 200 ok || La solicitud ha tenido éxito.
// 201 Created || Se ha creado un nuevo recurso como resultado.
// 404 not found || El servidor no pudo encontrar el contenido solicitado.
// 500 internal server error || El servidor encontró una condición inesperada que le impide cumplir con la solicitud.