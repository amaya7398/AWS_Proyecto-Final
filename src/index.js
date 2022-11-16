const express = require("express");
const routeAlumnos = require("./routes/alumnos.routes.js");
const routeProfesores = require("./routes/profesores.routes.js");
const app = express();

app.use(express.cors()); //Se podría importar el módulo cors y usarlo como middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//As "Morgana" middleware
app.use((req, _, next) => {
    console.log(req.method, "=> ", req.url);
    next();
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

//ROUTES
app.use("/alumnos", routeAlumnos);
app.use("/profesores", routeProfesores);


const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("server running on port", port);
});