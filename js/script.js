document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de eventos ao formulário para a submissão
    document.querySelector('form').addEventListener('submit', traduzir);
});

function traduzir(event) {
    // Impede o comportamento padrão do formulário
    event.preventDefault();

    // Obter o valor do idioma selecionado
    let language = document.getElementById("language").value;
    // Obter o valor do texto digitado
    let text = document.getElementById("text").value;

    // Verificar se os valores são válidos
    if (language === "" || text === "") {
        alert("Please fill in the fields");
        return false;
    }

    // Construir a URL da API e adicionar os parâmetros de consulta
    let apiUrl = new URL("https://api.funtranslations.com/translate/" + language + ".json");
    apiUrl.searchParams.append("text", text);

    // Enviar a requisição para a API e obter a resposta em formato JSON
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Mostrar o resultado da tradução no campo de tradução
            document.getElementById("traducao").value = data.contents.translated;
        })
        .catch(error => {
            // Mostrar uma mensagem de erro na tela
            document.getElementById("traducao").value = "The translation failed. Please try again later.";
        });
}