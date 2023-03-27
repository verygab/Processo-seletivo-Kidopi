<?php

class MainController
{
    // Rotas
    public function index()
    {
        $paises = ['brazil', 'canada', 'australia'];
        $obitos = [];
        $confirmados = [];
        foreach ($paises as $pais) {
            $obitos[$pais] = 0;
            $confirmados[$pais] = 0;
            $consulta = $this->consultarApi($pais);
            $data = date('Y-m-d H:i:s');
            $dados = json_decode($consulta);
            if ($dados !== null) {
                foreach ($dados as $dado) {
                    $obitos[$pais] += $dado->Mortos;
                    $confirmados[$pais] += $dado->Confirmados;
                }
            } else {
                $obitos[$pais] = 'Erro';
                $confirmados[$pais] = 'Erro';
            }
        }
        require_once('content/views/index.php');
    }

    public function getLista()
    {

        // Chama o método consultarApi() com o valor do parâmetro
        $consulta = $this->consultarApi(null);
        $dados = json_decode($consulta);

        // Envia a resposta em formato JSON
        header('Content-Type: application/json');
        echo json_encode($dados);
    }

    public function acesso($params)
    {
        $pais = $params['pais'];
        $pais = $this->filtrarNomePais($pais);
        if ($pais === null) {
            // Exibe uma mensagem de erro ou redireciona o usuário para outra página
            echo 'Erro: nome do país inválido ou falha ao consultar a API ou salvar no Banco de Dados.';
            return;
        }

        $consulta = $this->consultarApi($pais);
        if ($consulta !== null) {
            $data = date('Y-m-d H:i:s');
            require_once('content/views/pais.php');
        } else {
            require_once('content/views/erro.php');
        }
    }

    // Url para pegar os dados pelo javascript
    public function getAcesso($params)
    {
        // Recupera o valor do parâmetro "pais" da URL
        $pais = $params['pais'];

        // Chama o método consultarApi() com o valor do parâmetro
        $consulta = $this->consultarApi($pais);
        $dados = json_decode($consulta);

        // Envia a resposta em formato JSON
        header('Content-Type: application/json');
        echo json_encode($dados);
    }

    public function comparar($params)
    {
        $pais1 = $params['pais1'];
        $pais1 = $this->filtrarNomePais($pais1);
        $pais2 = $params['pais2'];
        $pais2 = $this->filtrarNomePais($pais2);

        if ($pais1 === null || $pais2 === null) {
            // Exibe uma mensagem de erro ou redireciona o usuário para outra página
            echo 'Erro: nome do país inválido ou falha ao consultar a API ou salvar no Banco de Dados.';
            return;
        }

        // Consultar as APIS
        $consulta1 = $this->consultarApi($pais1);
        $consulta2 = $this->consultarApi($pais2);
        if ($consulta1 === null || $consulta2 === null) {
            // Exibe uma mensagem de erro ou redireciona o usuário para outra página
            echo 'Erro: nome do país inválido ou falha ao consultar a API ou salvar no Banco de Dados.';
            return;
        }
        $data = date('Y-m-d H:i:s');

        require_once('content/views/comparar.php');
    }

    public function getComparar($params)
    {
        // Recupera os valores dos parâmetros "pais1" e "pais2" da URL
        $pais1 = $params['pais1'];
        $pais2 = $params['pais2'];

        // Chama o método consultarApi() com os valores dos parâmetros
        $consulta1 = $this->consultarApi($pais1);
        $consulta2 = $this->consultarApi($pais2);

        // Decodifica os dados
        $dados1 = json_decode($consulta1, true);
        $dados2 = json_decode($consulta2, true);

        // Variáveis para armazenar os totais de óbitos e confirmados para cada país
        $totais1 = array('obitos' => 0, 'confirmados' => 0);
        $totais2 = array('obitos' => 0, 'confirmados' => 0);

        // Soma os valores de óbitos e confirmados para o primeiro país
        if (is_array($dados1)) {
            foreach ($dados1 as $item) {
                $totais1['obitos'] += $item['Mortos'];
                $totais1['confirmados'] += $item['Confirmados'];
            }
        } else {
            $totais1['obitos'] = $dados1['Mortos'];
            $totais1['confirmados'] = $dados1['Confirmados'];
        }

        // Soma os valores de óbitos e confirmados para o segundo país
        if (is_array($dados2)) {
            foreach ($dados2 as $item) {
                $totais2['obitos'] += $item['Mortos'];
                $totais2['confirmados'] += $item['Confirmados'];
            }
        } else {
            $totais2['obitos'] = $dados2['Mortos'];
            $totais2['confirmados'] = $dados2['Confirmados'];
        }

        // Cria um array associativo com as informações do país
        $json_data = array(
            'pais1' => array(
                'nome' => ucfirst(strtolower($pais1)),
                'totais' => $totais1
            ),
            'pais2' => array(
                'nome' => ucfirst(strtolower($pais2)),
                'totais' => $totais2
            )
        );

        // Envia a resposta em formato JSON
        header('Content-Type: application/json');
        echo json_encode($json_data);
    }


    // Funções
    public function consultarApi($pais)
    {
        require_once('application/models/Api.php');
        if ($pais === null) {
            // Verifique se os dados estão no cache
            $dados = $this->lerCache('lista');
            if ($dados !== null) {
                return json_encode($dados);
            }

            // Se os dados não estiverem no cache, consulte a API
            $api = new Api();
            $dadosApi = $api->consumirDados(null, 'https://dev.kidopilabs.com.br/exercicio/covid.php?listar_paises=1');

            // Salve os dados no cache antes de retorná-los
            $this->salvarCache($pais, json_decode($dadosApi, true));
            return $dadosApi;
        }
        // Verifique se os dados estão no cache
        $dados = $this->lerCache($pais);
        if ($dados !== null) {
            return json_encode($dados);
        }

        // Se os dados não estiverem no cache, consulte a API
        $api = new Api();
        $dadosApi = $api->consumirDados($pais);
        if ($this->salvarConsulta($pais) === false) {
            echo 'Erro ao salvar no banco de dados';
            return;
        }

        // Salve os dados no cache antes de retorná-los
        $this->salvarCache($pais, json_decode($dadosApi, true));
        return $dadosApi;
    }

    public function lerCache($pais)
    {
        $cacheFile = 'cache/' . $pais . '.json';
        if (file_exists($cacheFile)) {
            $data = file_get_contents($cacheFile);
            $data = json_decode($data, true);
            if (isset($data['expira_em']) && time() < $data['expira_em']) {
                return $data['dados'];
            } else {
                // remove o arquivo de cache expirado
                unlink($cacheFile);
            }
        }
        return null;
    }


    public function salvarCache($pais, $dados, $tempoVida = 3600) // tempo de vida padrão de 1 hora
    {
        $cacheFile = 'cache/' . $pais . '.json';
        $data = array(
            'dados' => $dados,
            'expira_em' => time() + $tempoVida // define a data de expiração do cache
        );
        file_put_contents($cacheFile, json_encode($data));
    }



    // tenta salvar no banco de dados
    public function salvarConsulta($pais)
    {
        require_once('application/models/Acesso.php');
        $acesso = new Acesso();
        return $acesso->novoAcesso($pais);
    }
    function filtrarNomePais($nomePais)
    {
        // Verifica se o nome do país é uma string
        if (!is_string($nomePais)) {
            return null;
        }

        // Converte o nome do país para minúsculas
        $nomePais = strtolower($nomePais);

        // Verifica se o nome do país tem um comprimento mínimo e máximo válido
        if (strlen($nomePais) < 3 || strlen($nomePais) > 50) {
            return null;
        }

        // Verifica se o nome do país não contém caracteres especiais ou números
        if (!preg_match('/^[a-zA-Z\s]+$/', $nomePais)) {
            return null;
        }

        // Retorna o nome do país validado e filtrado
        return $nomePais;
    }
}
