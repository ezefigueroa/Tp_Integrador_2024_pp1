const express = require ("express");
const bodyParser = require ("body-parser");
const PORT = 3000
const UsuarioRouter= require ("./routes/usuarioRoutes");



const app = express();

app.use(bodyParser.json());
app.use("/api/usuarios", UsuarioRouter)

app.listen (PORT, ()=> {
    console.log(`aplicacion corriendo en puerto ${PORT}`)
})