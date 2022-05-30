<?php
    session_start();
?>
<!DOCTYPE html>
<!-- Homepage -->
<html lang = "en">
    <head>
        <title> Login </title>
        <meta charset = "utf-8" />
        <link href = "loginCSS.css" rel = "stylesheet">
        <script src = "loginJS.js" type = "text/JavaScript"></script>
    </head>
    <body>
        <div class = "ui">
            <h1> Login </h1>
            <form class = "login">
                <p>
                    <label for = "uname"> Username: </label>
                    <input type = "text" name = "uname" id = "uname">
                </p>
                <p>
                    <label for = "pword"> Password: </label>
                    <input type = "password" name = "pword" id = "pword">
                </p>
                <p>
                    <input type = "button" id = "submitButton" class = "submitButton" onclick = "loginUser(this.form)" value = "Login">
                </p>
            </form>
            <div id = "invalid">

            </div>
        </div>
    </body>
</html>