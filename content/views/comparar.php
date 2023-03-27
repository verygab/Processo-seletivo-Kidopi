<?php include('content/views/partials/head.php'); ?>
<title>Casos de Mortes por Covid <?php echo ucfirst($pais) ?></title>
</head>

<body class="body-bg">
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand btn btn-pill btn-dark" href="/">Página Inicial</a>
            </div>
        </nav>
    </header>

    <main>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <canvas id="chart"></canvas>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div id="tabela"></div>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer mt-5 pt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="footer-text mb-2">Fonte dos dados <?php echo (ucfirst($pais1)) ?>: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?pais=<?php echo $pais1 ?>" target="_blank">Kidopi</a></p>
                    <p class="footer-text mb-2">Fonte dos dados <?php echo (ucfirst($pais2)) ?>: <a href="https://dev.kidopilabs.com.br/exercicio/covid.php?pais=<?php echo $pais2 ?>" target="_blank">Kidopi</a></p>
                    <p class="footer-text">Data da última atualização: <?php echo $data ?></p>
                </div>
            </div>
        </div>
    </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/tablesort.min.js" integrity="sha512-F/gIMdDfda6OD2rnzt/Iyp2V9JLHlFQ+EUyixDg9+rkwjqgW1snpkpx7FD5FV1+gG2fmFj7I3r6ReQDUidHelA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/content/assets/js/chart.js"></script>
    <?php include 'content/partials/footer.php'; ?>