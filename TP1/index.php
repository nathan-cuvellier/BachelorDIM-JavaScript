<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TP1</title>
    <link rel="stylesheet" href="style/app.css">
</head>
<body>
    <header>
        <h1>Auth</h1>
    </header>

    <nav>
        <ul>
            <li>
                <a href=".">Accueil</a>
            </li>
            <li>
                <a href="admin" id="admin-link">Admin</a>
            </li>
        </ul>
    </nav>

    <div class="bg d-none">
        <div class="code">
            <?php for ($i = 1; $i < 10; $i++) { ?>
                <div data-id="<?= $i ?>">
                    <span><?= $i ?></span>
                </div>
            <?php } ?>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
