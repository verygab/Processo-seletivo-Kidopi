document.addEventListener('DOMContentLoaded', function () {
  var pais = window.location.pathname.split('/').pop() // "/acesso/brazil" ->"brazil"

  function criarTabela (dados) {
    // Cria a tabela e o corpo
    var tabela = document.createElement('table')
    tabela.classList.add(
      'table',
      'table-striped',
      'table-hover',
      'table-bordered',
      'dt-responsive',
      'nowrap',
      'table-responsive-md'
    )

    // Adiciona o cabeçalho da tabela
    var cabecalho = tabela.createTHead()
    cabecalho.classList.add('thead-light', 'thead')
    var linhaCabecalho = cabecalho.insertRow(0)

    // Adiciona coluna "Estado"
    var estadoHeader = linhaCabecalho.insertCell(-1)
    estadoHeader.textContent = 'Estado'
    estadoHeader.dataset.coluna = 'estado'
    estadoHeader.classList.add('sortable')
    estadoHeader.classList.add('table-title')

    estadoHeader.onclick = function () {
      updateSortIcons(this)
    }

    // Adiciona ícone de ordenação ao cabeçalho "Estado"
    var estadoSortIcon = document.createElement('span')
    estadoSortIcon.classList.add('sort-icon', 'fas', 'fa-sort')
    estadoHeader.appendChild(estadoSortIcon)

    // Adiciona coluna "Confirmados"
    var confirmadosHeader = linhaCabecalho.insertCell(-1)
    confirmadosHeader.dataset.coluna = 'confirmados'
    confirmadosHeader.dataset.direcao = 'asc'
    confirmadosHeader.classList.add('sortable')
    confirmadosHeader.classList.add('table-title')
    confirmadosHeader.textContent = 'Confirmados'

    confirmadosHeader.onclick = function () {
      updateSortIcons(this)
    }

    // Adiciona ícone de ordenação ao cabeçalho "Confirmados"
    var confirmadosSortIcon = document.createElement('span')
    confirmadosSortIcon.classList.add('sort-icon', 'fas', 'fa-sort')
    confirmadosHeader.appendChild(confirmadosSortIcon)

    // Adiciona coluna "Óbitos"
    var obitosHeader = linhaCabecalho.insertCell(-1)
    obitosHeader.dataset.coluna = 'obitos'
    obitosHeader.dataset.direcao = 'asc'
    obitosHeader.classList.add('sortable')
    obitosHeader.classList.add('table-title')
    obitosHeader.textContent = 'Óbitos'

    obitosHeader.onclick = function () {
      updateSortIcons(this)
    }

    // Adiciona ícone de ordenação ao cabeçalho "Óbitos"
    var obitosSortIcon = document.createElement('span')
    obitosSortIcon.classList.add('sort-icon', 'fas', 'fa-sort')
    obitosHeader.appendChild(obitosSortIcon)

    // Adiciona a tabela ao container
    var tabelaContainer = document.createElement('div')
    tabelaContainer.classList.add('table-responsive')
    tabelaContainer.appendChild(tabela)

    // Adiciona as linhas de dados ao corpo da tabela
    var corpo = tabela.createTBody()
    corpo.setAttribute('id', 'corpo-tabela') // adiciona ID ao corpo da tabela
    for (var i = 0; i < dados.length; i++) {
      var linha = corpo.insertRow(-1)
      var celulaEstado = linha.insertCell(-1)
      celulaEstado.textContent = dados[i].Estado
      celulaEstado.setAttribute('data-coluna', 'estado')

      var celulaConfirmados = linha.insertCell(-1)
      celulaConfirmados.textContent = dados[i].Confirmados
      celulaConfirmados.setAttribute('data-coluna', 'confirmados')

      var celulaObitos = linha.insertCell(-1)
      celulaObitos.textContent = dados[i].Obitos
      celulaObitos.setAttribute('data-coluna', 'obitos')
    }

    // Adiciona a linha de busca
    var busca = document.createElement('input')
    busca.type = 'text'
    busca.classList.add('search-input')
    busca.classList.add('form-control')
    busca.placeholder = 'Buscar por estado'
    document.getElementById('tabela').appendChild(busca)

    busca.addEventListener('input', function () {
      pesquisarTabela(this.value)
    })

    // Adiciona a funcionalidade de ordenação na tabela
    var tablesort = new Tablesort(tabela)

    var originalSortFunction = tablesort.sortFunction
    tablesort.sortFunction = function (a, b) {
      var th = tablesort.current
      var icons = th.parentNode.querySelectorAll('.sort-icon')
      for (var i = 0; i < icons.length; i++) {
        icons[i].classList.remove('fa-sort-up', 'fa-sort-down')
        icons[i].classList.add('fa-sort')
      }

      var result = originalSortFunction.call(this, a, b)
      var icon = th.querySelector('.sort-icon')
      if (tablesort.dir === 'asc') {
        icon.classList.remove('fa-sort', 'fa-sort-down')
        icon.classList.add('fa-sort-up')
      } else if (tablesort.dir === 'desc') {
        icon.classList.remove('fa-sort', 'fa-sort-up')
        icon.classList.add('fa-sort-down')
      }
      return result
    }

    // Adiciona a tabela à página
    document.getElementById('tabela').appendChild(tabelaContainer)
  }
  function pesquisarTabela (valorBusca) {
    var tabela = document.getElementById('corpo-tabela')
    var linhas = tabela.getElementsByTagName('tr')
    for (var i = 1; i < linhas.length; i++) {
      // Inicie a partir de 1 para pular a linha de busca
      var linha = linhas[i]
      var colunas = linha.getElementsByTagName('td')
      var encontrou = false
      for (var j = 0; j < colunas.length; j++) {
        var coluna = colunas[j]
        if (
          coluna.getAttribute('data-coluna') === 'estado' &&
          coluna.textContent.toLowerCase().indexOf(valorBusca.toLowerCase()) >
            -1
        ) {
          encontrou = true
          break
        }
      }
      if (encontrou) {
        linha.style.display = ''
      } else {
        linha.style.display = 'none'
      }
    }
  }
  function updateSortIcons (header) {
    var icons = header.parentNode.querySelectorAll('.sort-icon')
    for (var i = 0; i < icons.length; i++) {
      icons[i].classList.remove('fa-sort-up', 'fa-sort-down')
      icons[i].classList.add('fa-sort')
    }

    var icon = header.querySelector('.sort-icon')
    var direcao = header.dataset.direcao

    if (direcao === 'asc') {
      icon.classList.remove('fa-sort', 'fa-sort-down')
      icon.classList.add('fa-sort-up')
      header.dataset.direcao = 'desc'
    } else {
      icon.classList.remove('fa-sort', 'fa-sort-up')
      icon.classList.add('fa-sort-down')
      header.dataset.direcao = 'asc'
    }
  }

  // Consumir dados da API
  function getDados (pais) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText)
        var dados = []
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var item = response[key]
            var novoItem = {
              Estado: item.ProvinciaEstado,
              Confirmados: item.Confirmados,
              Obitos: item.Mortos
            }
            dados.push(novoItem)
          }
        }
        criarTabela(dados)
      }
    }
    xhttp.open('GET', '/getAcesso/' + pais, true)
    xhttp.send()
  }

  // Chamar a função para consumir os dados da API
  getDados(pais)
})
