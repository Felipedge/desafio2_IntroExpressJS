const express = require('express')
const app = express()
const fs = require("fs")
const PORT = 3000;



app.listen(3000, console.log("¡Servidor encendido!"))


app.get("/home", (req, res) => {
    res.send("Hello World Express Js")
})