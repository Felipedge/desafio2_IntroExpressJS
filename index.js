const express = require('express');
const app = express();
const fs = require("fs")
const PORT = 3000;
const cors = require('cors');
const e = require('express');

app.use(cors())
app.use(express.json())

app.listen(PORT, console.log("¡Servidor encendido!"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    res.json(canciones)
})

app.post('/canciones', (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Cancion agregada =)')
})

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción eliminada con éxito!')
})

app.put('/canciones/:id', (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
    canciones[index] = cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción modificada')
})

app.listen(port, () => {
    console.log(`App initialized on port ${port}`)
})