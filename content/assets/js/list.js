window.addEventListener('load', function () {
  function criarListaOpcoes (dados) {
    // Cria os elementos HTML
    const container = document.getElementById('list')
    const select1 = document.createElement('select')
    const select2 = document.createElement('select')
    const botao = document.createElement('button')

    select1.classList.add('form-select', 'me-2')
    select2.classList.add('form-select', 'me-2')
    botao.classList.add('btn', 'btn-primary', 'mt-2')

    // Adiciona as opções aos selects
    for (const [index, nomePais] of Object.entries(dados)) {
      const option1 = document.createElement('option')
      option1.value = nomePais
      option1.text = nomePais
      select1.appendChild(option1)

      const option2 = document.createElement('option')
      option2.value = nomePais
      option2.text = nomePais
      select2.appendChild(option2)
    }

    // Define o texto do botão e a URL de destino
    botao.textContent = 'Comparar Países'
    botao.addEventListener('click', function () {
      const opcao1 = select1.value
      const opcao2 = select2.value
      const url = `http://localhost/comparar/${opcao1}/${opcao2}`
      window.location.href = url
    })

    // Adiciona os elementos ao container
    container.appendChild(select1)
    container.appendChild(select2)
    container.appendChild(botao)
  }
  function getLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        criarListaOpcoes(response);
      }
    };
    xhttp.open("GET", "/getLista/", true);
    xhttp.send();
  }
  getLista();
})
