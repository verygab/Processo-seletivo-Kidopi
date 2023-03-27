<?php include('content/views/partials/head.php'); ?>

<body class="body-bg">
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <h2 class="title">Processo Seletivo Kidopi</h2>
            </div>
        </nav>
    </header>
    <main>
        <div class="container mt-5">
            <div class="row">
                <div class="col-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h3 class="card-title">Brazil</h3>
                            <p>Óbitos: <?php echo $obitos['brazil'] ?></p>
                            <p>Confirmados: <?php echo $confirmados['brazil'] ?></p>
                            <a class="btn btn-primary" href="/acesso/brazil">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h3 class="card-title">Canada</h3>
                            <p>Óbitos: <?php echo $obitos['canada'] ?></p>
                            <p>Confirmados: <?php echo $confirmados['canada'] ?></p>
                            <a class="btn btn-primary" href="/acesso/canada">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h3 class="card-title">Australia</h3>
                            <p>Óbitos: <?php echo $obitos['australia'] ?></p>
                            <p>Confirmados: <?php echo $confirmados['australia'] ?></p>
                            <a class="btn btn-primary" href="/acesso/ausralia">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <div id="list"></div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </main>
    <footer class="footer mt-5 pt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="footer-text mb-2">Fonte dos dados do Brasil: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?pais=brasil" target="_blank">Kidopi</a></p>
                    <p class="footer-text mb-2">Fonte dos dados do Canadá: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?pais=canada" target="_blank">Kidopi</a></p>
                    <p class="footer-text mb-2">Fonte dos dados da Austrália: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?pais=australia" target="_blank">Kidopi</a></p>
                    <p class="footer-text mb-2">Fonte da lisa de países: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?listar_paises=1" target="_blank">Kidopi</a></p>
                    <p class="footer-text">Data da última atualização: <?php echo $data ?></p>
                </div>
            </div>
        </div>
    </footer>
    <script src="/content/assets/js/list.js"></script>
    <?php include 'content/partials/footer.php'; ?>