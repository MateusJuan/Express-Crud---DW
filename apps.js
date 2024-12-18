document.addEventListener('DOMContentLoaded', () => {
    const tabelaMusicas = document.querySelector('#tabelaMusicas tbody');
    const formAdicionar = document.querySelector('#formMusica');
    const formAtualizar = document.querySelector('#formAtualizar');
    const formDeletar = document.querySelector('#formDeletar');
    const mensagem = document.querySelector('#mensagem');

    async function carregarMusicas() {
        try {
            const response = await fetch('/musica');
            if (!response.ok) throw new Error('Erro ao carregar músicas');
            const musicas = await response.json();

            tabelaMusicas.innerHTML = ''; // Limpa a tabela
            musicas.forEach(musica => {
                const row = `
                    <tr>
                        <td>${musica.id}</td>
                        <td>${musica.nome}</td>
                    </tr>
                `;
                tabelaMusicas.insertAdjacentHTML('beforeend', row);
            });
        } catch (err) {
            mensagem.textContent = 'Erro ao carregar músicas!';
        }
    }

    formAdicionar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.querySelector('#nome').value;

        try {
            const response = await fetch('/musica', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            mensagem.textContent = result.message;
            carregarMusicas();
            formAdicionar.reset();
        } catch (err) {
            mensagem.textContent = err.message;
        }
    });

    formAtualizar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.querySelector('#atualizarId').value;
        const novoNome = document.querySelector('#novoNome').value;

        try {
            const response = await fetch(`/musica/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            mensagem.textContent = result.message;
            carregarMusicas();
            formAtualizar.reset();
        } catch (err) {
            mensagem.textContent = err.message;
        }
    });

    formDeletar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.querySelector('#deletarId').value;

        try {
            const response = await fetch(`/musica/${id}`, { method: 'DELETE' });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            mensagem.textContent = result.message;
            carregarMusicas();
            formDeletar.reset();
        } catch (err) {
            mensagem.textContent = err.message;
        }
    });

    carregarMusicas();
});
