<?php

class Acesso
{
    private $connection;
    public function __construct()
    {
        require_once('application/config/config.php');

        $this->connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if (mysqli_connect_errno()) {
            echo "Erro ao conectar ao banco de dados: " . mysqli_connect_error();
            exit();
        }
    }

    public function novoAcesso($pais)
    {
        // Sanitize and validate $pais before use
        $pais = mysqli_real_escape_string($this->connection, $pais);

        $sql = "INSERT INTO acesso (pais) VALUES ('$pais')";
        $result = mysqli_query($this->connection, $sql);

        if ($result) {
            return true;
        } else {
            echo "Erro ao executar a query: " . mysqli_error($this->connection);
            return false;
        }
    }

    public function __destruct()
    {
        // fecha a conexão com o banco de dados
        mysqli_close($this->connection);
    }
}
