const express = require ("express");
const bodyParser = require ("body-parser");
const PORT = 3000
const personasRouter= require ("./routes/personasRoutes");



const app = express();

app.use(bodyParser.json());
app.use("/api/personas", personasRouter)

app.listen (PORT, ()=> {
    console.log(`aplicacion corriendo en puerto ${PORT}`)
})