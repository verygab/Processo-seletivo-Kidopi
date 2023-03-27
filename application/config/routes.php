<?php

require_once 'application/vendor/autoload.php';

require_once 'application/vendor/altorouter/altorouter/AltoRouter.php';

require_once('application/controllers/MainController.php');

// Define as rotas
$router = new AltoRouter();

$router->map('GET', '/', 'MainController#index');
$router->map('GET', '/acesso/[*:pais]', 'MainController#acesso');
$router->map('GET', '/getAcesso/[*:pais]', 'MainController#getAcesso');
$router->map('GET', '/comparar/[*:pais1]/[*:pais2]', 'MainController#comparar');
$router->map('GET', '/getComparar/[*:pais1]/[*:pais2]', 'MainController#getComparar');
$router->map('GET', '/getLista/', 'MainController#getLista');


// Executa a rota correspondente
$match = $router->match();

// Verifica se a rota existe
if ($match) {
    // Se existir, executa o controlador e a ação correspondentes
    $target = $match['target'];
    $params = $match['params'];

    // Chama o método correto do controlador
    list($controller, $action) = explode('#', $target);
    $obj = new $controller();
    $obj->$action($params);
} else {
    // Caso contrário, exibe uma página de erro
    echo 'Erro 404 - Página não encontrada.';
}
?>