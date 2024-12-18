const apiUrl = 'http://localhost:3000/musica';
const tabelaMusicas = document.querySelector('#tabelaMusicas tbody');
const mensagem = document.getElementById('mensagem');

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
    setTimeout(() => mensagem.textContent = '', 3000);
}

async function carregarMusicas() {
    try {
        const resposta = await fetch(apiUrl);
        const musicas = await resposta.json();
        tabelaMusicas.innerHTML = '';
        musicas.forEach(musica => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${musica.id}</td>
                <td>${musica.nome}</td>
            `;
            tabelaMusicas.appendChild(linha);
        });
    } catch (erro) {
        exibirMensagem('Erro ao carregar músicas', 'error');
    }
}

document.getElementById('formMusica').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;

    try {
        const resposta = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: parseInt(id), nome })
        });

        const resultado = await resposta.json();
        if (resposta.ok) {
            exibirMensagem(resultado.message, 'success');
            carregarMusicas();
        } else {
            exibirMensagem(resultado.message, 'error');
        }
    } catch (erro) {
        exibirMensagem('Erro ao adicionar música', 'error');
    }
});

document.getElementById('formAtualizar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('atualizarId').value;
    const nome = document.getElementById('novoNome').value;

    try {
        const resposta = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        const resultado = await resposta.json();
        if (resposta.ok) {
            exibirMensagem(resultado.message, 'success');
            carregarMusicas();
        } else {
            exibirMensagem(resultado.message, 'error');
        }
    } catch (erro) {
        exibirMensagem('Erro ao atualizar música', 'error');
    }
});

document.getElementById('formDeletar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deletarId').value;

    try {
        const resposta = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        const resultado = await resposta.json();
        if (resposta.ok) {
            exibirMensagem(resultado.message, 'success');
            carregarMusicas();
        } else {
            exibirMensagem(resultado.message, 'error');
        }
    } catch (erro) {
        exibirMensagem('Erro ao deletar música', 'error');
    }
});

// Carregar as músicas ao carregar a página
carregarMusicas();