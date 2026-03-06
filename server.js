const express = require('express')
const fs = require('fs') //sistema de archivo para interactuar con archivos
const app = express() 
const port = 3000

app.listen(port, () => {
    console.log('Aerviio iniciando en: ' + port)
})

app.get('/creditos', (req, res) => {
    const contenido = fs.readFileSync('data.json'); //obtener los datos del archivo
    const data = JSON.parse(contenido); //string -> json
    res.send(data); //el objecto en si en json
})

app.get('/creditos/:importe', (req, res) => {
    const { importe } = req.params; 
    const contenido = fs.readFileSync('data.json');
    const data = JSON.parse(contenido);
    // Filtrar y que sea activo Y que el crédito sea mayor al parámetro
    const encontrados = data.filter(x => x.activo === true && x.credito > parseFloat(importe));
    if (encontrados.length === 0) {
        res.status(404).json({ mensaje: 'No hay créditos activos mayores a ese importe' });
    } else {
        res.json(encontrados);
    }
})

app.get('/creditos-cliente/:id', (req, res) => {
    const { id } = req.params; //obtiene solamente id 
    const contenido = fs.readFileSync('data.json');
    const data = JSON.parse(contenido);
    const cliente = data.find(x => x.id === id); // == por si uno es número y el otro texto
    if (!cliente) {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    } else { 
        res.send(cliente) // 'cliente', que es lo que quiero encontrar
    }
})