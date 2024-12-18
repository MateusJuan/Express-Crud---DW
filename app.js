const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

let musicas = [];
let nextId = 1;

app.get('/musica', (res) => {
    res.json(musicas);
});

app.get('/musica/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const musica = musicas.find(m => m.id === id);

    if (musica) {
        res.json(musica);
    } else {
        res.status(404).json({ message: 'Música não encontrada' });
    }
});

app.post('/musica', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Preencha o nome da música' });
    }

    const musica = { id: nextId++, nome };
    musicas.push(musica);
    res.status(201).json({ message: 'Música adicionada com sucesso', musica });
});

app.put('/musica/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const index = musicas.findIndex(m => m.id === id);

    if (index !== -1) {
        musicas[index].nome = nome;
        res.json({ message: 'Música atualizada com sucesso', musica: musicas[index] });
    } else {
        res.status(404).json({ message: 'Música não encontrada' });
    }
});

app.delete('/musica/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = musicas.findIndex(m => m.id === id);

    if (index !== -1) {
        musicas.splice(index, 1);
        res.json({ message: 'Música removida com sucesso' });
    } else {
        res.status(404).json({ message: 'Música não encontrada' });
    }
});

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
