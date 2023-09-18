<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/4fe4df4767.js" crossorigin="anonymous"></script>
    <title>Login Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <h1>Ponto Certo</h1>
        <h2>Entrar</h2>
        <form action="">
            <div class="input-field">
                <input type="text" name="username" id="username"
                    placeholder="Entre com seu e-mail">
                <div class="underline"></div>
            </div>
            <div class="input-field">
                <input type="password" name="password" id="password"
                    placeholder="Entre com sua senha">
                <div class="underline"></div>
            </div>

            <input type="submit" value="login">
        </form>

        <div class="footer">
            <span>Ou continue com:</span>
            <div class="social-fields">
                <div class="social-field google">
                    <a href="#">
                        <i class="fa-brands fa-google"></i>
                        Entrar com sua conta Google
                    </a>
                </div>

            </div>
        </div>
    </main>
</body>
</html>