let cardContainer = document.querySelector(".card-container");
let dados = [];

// Roda quando a página é carregada
window.onload = async () => {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);

    // Adiciona o evento de clique para o botão de busca
    document.getElementById('botao-busca').addEventListener('click', realizarBusca);

    // Adiciona o evento de "Enter" para o campo de busca
    document.getElementById('campoBusca').addEventListener('keyup', (event) => {
        // Verifica se a tecla pressionada foi "Enter"
        if (event.key === 'Enter') {
            realizarBusca();
        }
    });

    // Adiciona o evento de clique para o logo/título
    document.getElementById('logo-link').addEventListener('click', (event) => {
        event.preventDefault(); // Impede que o link recarregue a página
        document.getElementById('campoBusca').value = ''; // Limpa o campo de busca
        renderizarCards(dados); // Renderiza todos os filmes novamente
        window.scrollTo(0, 0); // Rola a página para o topo
    });
};

function realizarBusca() {
    const termoBusca = document.getElementById('campoBusca').value.toLowerCase();
    const resultados = dados.filter(filme => 
        filme.nome.toLowerCase().includes(termoBusca) || 
        filme.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    // Limpa os cards existentes antes de renderizar os novos
    cardContainer.innerHTML = '';
    if (dados.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Cria o HTML para as tags
        const tagsHTML = dado.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        article.innerHTML = `
            <img class="card-image" src="${dado.imagem}" alt="Pôster do filme ${dado.nome}">
            <div class="card-info">
                <div class="card-info-content">
                    <h2>${dado.nome}</h2>
                    <p class="card-year">${dado.data_criacao}</p>
                    <p class="card-description">${dado.descricao}</p>
                    <div class="card-tags">${tagsHTML}</div>
                </div>
                <a href="${dado.link || dado.site || '#'}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}