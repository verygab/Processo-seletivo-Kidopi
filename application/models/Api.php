<?php

class Api
{
    public $baseUrl;
    public function consumirDados($pais, $url = "https://dev.kidopilabs.com.br/exercicio/covid.php?pais=")
    {
        $this->baseUrl = $url;
        // inicializa uma nova sessão cURL
        $ch = curl_init();
        
        // configura as opções da requisição
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $pais); // define a URL da requisição
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // indica que a resposta da requisição deve ser retornada como uma string

        // faz a requisição HTTP para a URL usando o método GET
        $data = curl_exec($ch);

        // verifica se houve erros na requisição
        if ($data === false) {
            $msg = 'Erro na requisição: ' . curl_error($ch);
            // fecha a sessão cURL e envia a mensagem de erro
            curl_close($ch);
            return $msg;
        } else {
            // obtem o código de status HTTP da resposta e encerra a sessão cURL
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            // verifica se a requisição foi bem-sucedida, retorna a resposta e tenta salvar no banco de dados
            if ($http_code === 200) {
                return $data;
            } else {
                // retorna o código de status HTTP da resposta
                return 'Erro na requisição: código de status ' . $http_code;
            }
        }
    }
}
