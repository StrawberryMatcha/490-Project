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
        <title id = "pagename"> <?php echo $_GET['exam'] ?> </title>
        <meta charset = "utf-8" />
        <link href = "studentCSS.css" rel = "stylesheet">
        <script>
            function listQuestions() {

            var request = new XMLHttpRequest();

            request.onreadystatechange = function() {

                //console.log(request);
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    console.log('Exam Questions')
                    console.log(response);
                    for (var i = 0; i < response.length; i++) {
                        
                    }
                }
            };

            request.open("POST", "submitTypes/listQuestions.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send('examname=' + examName);
            }
        </script>
        <script src = "takeExam.js" type = "text/JavaScript"></script>
    </head>
    <body onload = "listQuestions(); loadExam();">
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
        <div hidden id = "aUsername"> <?php echo $_SESSION['username'] ?> </div>
        <div>
            <ul>
                <li><a>Exam: <?php echo $_GET['exam'] ?></a></li>
            </ul>
        </div>
        <div id = "questionSpace" class = "questionSpace">
            <form>
                <div id = "1" class = 'container' style = 'display: block;'>
                    <h3> doubleUp() </h3>
                    <p> Instructions: double the given value. Points: 8 </p>
                    <p> Constraint: None </p>
                    <p> Test case input: 4, Output: 8 </p>
                    <p> Test case input: 5, Output: 10 </p>
                    <textarea id = "1r" name = "1r" rows = "10" cols = "50" placeholder = "Write your code here."> </textarea>
                </div>
                <div id = "2" class = 'container' style = 'display: block;'>
                    <h3> fiveCases() </h3>
                    <p> Instructions: Perform math op on 8 and 2 based on input. Points: 10 </p>
                    <p> Constraint: None </p>
                    <p> Test case input: +, Output: 10 </p>
                    <p> Test case input: -, Output: 6 </p>
                    <p> Test case input: *, Output: 16 </p>
                    <p> Test case input: /, Output: 4 </p>
                    <p> Test case input: invalid, Output: -1 </p>
                    <textarea id = "2r" name = "2r" rows = "10" cols = "50" placeholder = "Write your code here."> </textarea>
                </div>
                <div id = "3" class = 'container' style = 'display: block;'>
                    <h3> combineStrings() </h3>
                    <p> Instructions: Combine two given strings with a space in between. Points: 10 </p>
                    <textarea id = "3r" name = "3r" rows = "10" cols = "50" placeholder = "Write your code here."> </textarea>
                    <p> Test case input: 'hello', 'world', Output: 'hello world' </p>
                    <p> Test case input: 'string1', 'string2', Output: 'string1 string2' </p>
                </div>
                <!--
                <button id="previous" onclick="previous()">Previous Question</button>
                <button id="next" onclick="next()">Next Question</button>
                -->
                <br>
                <input type = "button" onclick = "submitExam(this.form)" value = "Submit">
            </form>
        </div>
    </body>
    <script>
        const divs = [...document.querySelectorAll('.container')];
        console.log(divs);
    </script>
</html>