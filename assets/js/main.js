document.addEventListener('DOMContentLoaded', () => {

    // Lógica para as páginas de listagem de atividades (Eixos e Séries)
    // Verifica se a página atual tem a classe .pagina-atividades
    if (document.body.querySelector('.pagina-atividades')) {

        const botoesCategoria = document.querySelectorAll('.btn-categoria');
        const listasAtividades = document.querySelectorAll('.atividade-lista');
        const tituloCategoria = document.querySelector('.titulo-categoria');

        // Função genérica para mostrar a categoria selecionada
        const mostrarCategoria = (categoriaId) => {
            // Esconde todas as listas
            listasAtividades.forEach(lista => {
                lista.style.display = 'none';
            });

            // Remove a classe 'active' de todos os botões
            botoesCategoria.forEach(botao => {
                botao.classList.remove('active');
            });

            // Encontra e mostra a lista correta
            const listaAtiva = document.querySelector(`#${categoriaId}-atividades`);
            if (listaAtiva) {
                listaAtiva.style.display = 'block';
            }

            // Encontra e ativa o botão correto usando o atributo genérico 'data-categoria'
            const botaoAtivo = document.querySelector(`[data-categoria="${categoriaId}"]`);
            if (botaoAtivo) {
                botaoAtivo.classList.add('active');
                tituloCategoria.textContent = botaoAtivo.textContent;
            }
            
            // Atualiza a URL com a âncora
            history.pushState(null, '', `#${categoriaId}`);
        };

        // Adiciona o evento de clique para cada botão de categoria
        botoesCategoria.forEach(botao => {
            botao.addEventListener('click', () => {
                // Pega o valor do atributo genérico 'data-categoria'
                const categoriaId = botao.dataset.categoria;
                mostrarCategoria(categoriaId);
            });
        });

        // Verifica a URL ao carregar a página
        const hashInicial = window.location.hash.substring(1);
        if (hashInicial) {
            mostrarCategoria(hashInicial);
        } else {
            // Se não houver âncora, mostra a primeira categoria da lista por padrão
            if (botoesCategoria.length > 0) {
                mostrarCategoria(botoesCategoria[0].dataset.categoria);
            }
        }
    }
});