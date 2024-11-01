const express = require ("express");
const router = express.Router();

router.get ("/", (req,res)=>{
    res.status(200).send ("ruta principal de personas");
    
});

router.get ("/hola", (req,res)=>{
    res.status(200).send ("ruta principal de personas hola");
    
});

module.exports = router;
