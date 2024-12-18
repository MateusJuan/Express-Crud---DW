const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use (bodyParser.json());

let pessoas = [
    {id : 1, nome: 'Mateus', idade: 16},
    {id : 2, nome: 'Eliel', idade: 16},
    {id : 3, nome: 'João', idade: 35}
];

app.get('/pessoa',(res)=>{
    res.json(pessoas);
});

app.get('/pessoa/:id',(req,res)=>{
    const id = parseInt(req.params.id);
});