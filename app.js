const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use (bodyParser.json());

let pessoas = [
    {id : 1, nome: 'João', idade: 25},
    {id : 2, nome: 'Maria', idade: 30},
    {id : 3, nome: 'Pedro', idade: 35}
];

app.get('/pessoa',(res)=>{
    res.json(pessoas);
});

app.get('/pessoa/:id',(req,res)=>{
    const id = parseInt(req.params.id);
});