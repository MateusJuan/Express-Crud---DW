const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use (bodyParser.json());

let musicas = [
    {id : 1, nome: 'Hino Nacional Brasileiro'},
    {id : 2, nome: 'Cancão do xpedicionáirio'},
    {id : 3, nome: 'Dobrado Baptista de Melo'}
];

app.get('/musica',(res)=>{
    res.json(musicas);
});

app.get('/musica/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const musica = musicas.find(musica => musica.id === id);

    if (musica){
        res.json(musica);
    }else{
        res.status(404).json({message: 'Musica não encontrada'});
    }
});

app.post('/musica',(req,res)=>{
    const {id,nome} = req.body;

    if (!id || !nome){
        res.status(400).json({message: 'Preencha todos os campos'});
    }
    
    musica.push({id,nome});
    res.status(201).json({message:'Musica Adiconada com sucesso',musica:{id,nome}});
});

app.put('/musica/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {nome} = req.body;

    const index = musicas.find(musica => musica.id === id);

    if (index !== -1){
        musicas[index].nome = nome;

        res.json({message: 'Musica atualizada com sucesso',musica: musicas[indexe]})
    }else{
        res.status(404).json({message: 'Musica não encontrada'});
    }
});

app.delete('/pessoa/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = musicas.findIndex(musica => musica.id === id);

    if(index !== -1){
        musicas.splice(index,1);
        res.json({message: 'Musica removida com sucesso'});
    }else{
        res.status(404).json({message: 'Musica não encontrada'});
    }
});

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});


Quero pedir ao usuário as informações 