window.addEventListener('load', function () {
  var urlParams = window.location.pathname.split('/') // comparar/brazil/canada
  var pais1 = urlParams[2] // brazil
  var pais2 = urlParams[3] // canada

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

    // Adiciona coluna "Pais"
    var paisHeader = linhaCabecalho.insertCell(-1)
    paisHeader.textContent = 'País'
    paisHeader.dataset.coluna = 'pais'
    paisHeader.classList.add('sortable')
    paisHeader.classList.add('table-title')

    paisHeader.onclick = function () {
      updateSortIcons(this)
    }

    // Adiciona ícone de ordenação ao cabeçalho "País"
    var paisSortIcon = document.createElement('span')
    paisSortIcon.classList.add('sort-icon', 'fas', 'fa-sort')
    paisHeader.appendChild(paisSortIcon)

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
      var celulaPais = linha.insertCell(-1)
      celulaPais.textContent = dados[i].Pais
      celulaPais.setAttribute('data-coluna', 'pais')

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
    busca.placeholder = 'Buscar por pais'
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

  function criarGrafico (dados) {
    var ctx = document.getElementById('chart').getContext('2d')
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [dados[0].pais, dados[1].pais],
        datasets: [
          {
            label: 'Confirmados',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [dados[0].confirmados, dados[1].confirmados]
          },
          {
            label: 'Óbitos',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [dados[0].obitos, dados[1].obitos]
          }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                label += context.parsed.y
                return label.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
            }
          }
        }
      }
    })
  }

  // Consumir dados da API
  function getComparar (pais1, pais2) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText)

        var dadosGrafico = [
          {
            pais: response.pais1.nome.charAt(0).toUpperCase() + response.pais1.nome.slice(1),
            confirmados: response.pais1.totais.confirmados,
            obitos: response.pais1.totais.obitos
          },
          {
            pais: response.pais2.nome.charAt(0).toUpperCase() + response.pais2.nome.slice(1),
            confirmados: response.pais2.totais.confirmados,
            obitos: response.pais2.totais.obitos
          }
        ]
        var dadosTabela = []

        for (var i = 0; i < dadosGrafico.length; i++) {
          var item = dadosGrafico[i]
          var novoItem = {
            Pais: item.pais,
            Confirmados: item.confirmados,
            Obitos: item.obitos
          }
          dadosTabela.push(novoItem)
        }
        criarGrafico(dadosGrafico)
        criarTabela(dadosTabela)
      }
    }
    xhttp.open('GET', '/getComparar/' + pais1 + '/' + pais2, true)
    xhttp.send()
  }

  getComparar(pais1, pais2)
  // Cria o gráfico
})
