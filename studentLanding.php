<?php
    session_start();
    if(!isset($_SESSION['type']) || $_SESSION['type'] != 'STUDENT') {
        header("Location:index.php");
    }
?>
<!DOCTYPE html>
<!-- Student Page -->
<html lang = "en">
    <head>
        <title> Student </title>
        <meta charset = "utf-8" />
        <link href = "studentCSS.css" rel = "stylesheet">
        <script src = "studentJS.js" type = "text/JavaScript"></script>
    </head>
    <body onload = "getActivatedExams(); getReleasedExams(); insertTab(); hideElement();">
        <h1>
            <form action = "submitTypes/logout.php">
                <label for = "logoutButton" id = "studentNameHeader"> Welcome, <?php echo $_SESSION['username'] ?> </label>
                <input style = 
                    "background-color: lightcoral;
                    color: black;
                    font-size: 28px;
                    text-align: center;
                    border-radius: 8px;
                    padding: 3px 16px;
                    margin-left: 20px;" 
                id = "logoutButton" type = "submit" value="Logout">
            </form>
        </h1>
        <div>
            <ul>
                <li><a onclick="toggleTExam()">Take Exams</a></li>
                <li><a onclick="toggleRExam()">Review Exams</a></li>
            </ul>
        </div>
        <div id = "takeExams" class = "takeExams">
            <div id = "selectExam">
                
            </div>
        </div>
        <div id = "reviewExams" class = "reviewExams">
            <div id = "selectReleasedExam">

            </div>
        </div>
    </body>
</html>