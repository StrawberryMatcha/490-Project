<?php
    session_start();
    if(!isset($_SESSION['type']) || $_SESSION['type'] != 'TEACHER') {
        header("Location:index.php");
    }
?>
<!DOCTYPE html>
<!-- Teacher Page -->
<html lang = "en">
    <head>
        <title> Teacher </title>
        <meta charset = "utf-8" />
        <link href = "teacherCSS.css" rel = "stylesheet">
        <script>
            function getStudentExams(form) {
    
                var request = new XMLHttpRequest();

                request.onreadystatechange = function() {

                    console.log(request);
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                        var response = JSON.parse(this.responseText);
                        console.log(response);
                        if (response.length == 0) {
                            document.getElementById('adjustExamStatusCode').innerHTML = "No responses for selected exam yet."
                        }
                        else {
                            document.getElementById('adjustingName').innerHTML = response.examName;
                            // List of every exam
                            var studAnswers = response[1];
                            totalStudent = studAnswers.length;
                            // Go through each student
                            loadStudent(studAnswers);
                        }
                    }
                };
                var examName = document.getElementById('adjustName').value;
                console.log(examName);
                document.getElementById('adjustingName').innerHTML = examName;
                if (examName == '') {document.getElementById('adjustExamStatusCode').innerHTML = "Please enter an exam name."}
                else {
                    request.open("POST", "submitTypes/getStudentExams.php", true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.send('exName=' + examName);
                }    
            }
        </script>
        <script src = "teacherJS.js" type = "text/JavaScript"></script>
    </head>
    <body onload = "listQuestions(); listExams();">
        <h1>
            <form action = "submitTypes/logout.php">
                <label for = "logoutButton"> Welcome, <?php echo $_SESSION['username'] ?> </label>
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
                <li class = "menubar"><a onclick="toggleQuestions()">Create Questions</a></li>
                <li class = "menubar"><a onclick="toggleCExam()">Create Exams</a></li>
                <li class = "menubar"><a onclick="toggleMExam()">Manage Exams</a></li>
                <li class = "menubar"><a onclick="toggleRExam()">Review Exams Manually</a></li>
            </ul>
        </div>
        <div id = "createQuestions">
            <div class = "half">
                <h2>Create Question</h2>
                <form id = "questionParam">
                    <p>                    
                        <label for = "pyFunc"> Function Name: </label>
                        <input type = "text" id = "pyFunc" name = "pyFunc" placeholder = "Ex: divideBy2">
                    </p>
                    <p>
                        <label for = "instructions"> Question Instructions: </label>
                        <textarea name = "instructions" id = "instructions" rows = "5" placeholder = "Ex: Write a Python function called divideBy2, which divides an input by 2 and returns the result."></textarea>
                    </p>
                    <p>
                        <label for = "difficulty"> Difficulty: </label>
                        <select id = "difficulty" name = "difficulty">
                            <option value = "Easy"> Easy </option>
                            <option value = "Medium"> Medium </option>
                            <option value = "Hard"> Hard </option> 
                        </select>
                    </p>
                    <p>
                        <label for = "topic"> Topic: </label>
                        <select id = "topic" name = "topic">
                            <option value = "Numbers"> Numbers </option>
                            <option value = "Strings"> Strings </option>
                            <option value = "Lists" > Lists </option>
                        </select> 
                    </p>
                    <p>
                        <label for = "constraint"> Constraint: </label>
                        <select id = "constraint" name = "constraint">
                            <option value = "None"> None </option>
                            <option value = "For"> For Loop </option>
                            <option value = "While"> While Loop </option>
                            <option value = "Recursion"> Recursion </option>
                        </select> 
                    </p>
                    <p>
                        <label for = "numTC"> Test Cases: </label>
                        <select id = "numTC" name = "numTC" onchange = "loadCases();">
                            <option value = 2> 2 </option>
                            <option value = 3> 3 </option>
                            <option value = 4> 4 </option>
                            <option value = 5> 5 </option>
                        </select> 
                    </p>     
                    <p>
                        <label for = "tc1I"> Test Case 1 Input: </label>
                        <input type = "text" id = "tc1I" name = "tc1I" placeholder = "Ex: 18">
                    </p>
                    <p>
                        <label for = "tc1O"> Test Case 1 Output: </label>
                        <input type = "text" id = "tc1O" name = "tc1O" placeholder = "Ex: 9">
                    </p>
                    <p>
                        <label for = "tc2I"> Test Case 2 Input: </label>
                        <input type = "text" id = "tc2I" name = "tc2I" placeholder = "Ex: 5">
                    </p>
                    <p>
                        <label for = "tc2O"> Test Case 2 Output:  </label>
                        <input type = "text" id = "tc2O" name = "tc2O" placeholder = "Ex: 2.5">
                    </p>
                    <input type = "button" onclick = "createQuestion(this.form)" value = "Submit">
                </form>
                <div id = "createQStatusCode">

                </div>
            </div>
            <div class = "half qBank">
                <h2> Question Bank </h2>
                <div id = cqSearch>
                    <h3> Question Search </h3>
                    <form>
                        <label for = "cqsTopic"> Topic: </label>
                        <select id = "cqsTopic" name = "cqsTopic" placeholder = "Search by Topic">
                            <option value = "Any"> Any </option>
                            <option value = "Numbers"> Numbers </option>
                            <option value = "Strings"> Strings </option>
                            <option value = "Lists"> Lists </option>
                        </select>
                        <label for = "cqsDifficulty"> Difficulty: </label>
                        <select id = "cqsDifficulty" name = "cqsifficulty">
                            <option value = "Any"> Any </option>
                            <option value = "Easy"> Easy </option>
                            <option value = "Medium"> Medium </option>
                            <option value = "Hard"> Hard </option> 
                        </select>
                        <br>
                        <label for = "cqsKeyword"> Keyword: </label>
                        <input type = "text" id = "cqsKeyword" name = "cqsKeyword" placeholder = "Search by Keyword">
                        <input type = "button" onclick = "searchQuestions(this.form)" value = "Search">
                    </form>
                </div>
                <ol id = "qBank">
                    
                </ol>   
            </div>
        </div>
        <div id = "createExam">
            <div class = "half">
                <h2> Create Exam </h2>
                <form>
                    <label for = "exName"> Exam Name: </label>
                    <input type = "text" id = "exName" name = "exName" placeholder = "Ex: Exam 1">
                    <br>
                    <input type = "button" id = "addQ" class = "addQButton" onclick = "addQuestion()" value = "Add Question">
                    <input type = "button" id = "addQ" class = "removeQButton" onclick = "removeQuestion()" value = "Remove Question">
                    <br>
                    <div id = "examQ" class = "examHalf"> 

                    </div>
                    <div id = "qPoints" class = "examHalf"> 
                        
                    </div>
                    <br>
                    <input type = "button" class = "submitButton" onclick = "createExam()" value = "Create Exam">
                </form>
                <br>
                <div id = "createExamStatusCode"> 

                </div>
            </div>
            <div class = "half qBank">
            <h2> Question Bank </h2>
                <div id = "ceSearch">
                    <h3> Question Search </h3>
                    <form>
                        <label for = "cqsTopic"> Topic: </label>
                        <select id = "cqsTopic" name = "cqsTopic" placeholder = "Search by Topic">
                            <option value = "Any"> Any </option>
                            <option value = "Numbers"> Numbers </option>
                            <option value = "Strings"> Strings </option>
                            <option value = "Lists"> Lists </option>
                        </select>
                        <label for = "cqsDifficulty"> Difficulty: </label>
                        <select id = "cqsDifficulty" name = "cqsifficulty">
                            <option value = "Any"> Any </option>
                            <option value = "Easy"> Easy </option>
                            <option value = "Medium"> Medium </option>
                            <option value = "Hard"> Hard </option> 
                        </select>
                        <br>
                        <label for = "cqsKeyword"> Keyword: </label>
                        <input type = "text" id = "cqsKeyword" name = "cqsKeyword" placeholder = "Search by Keyword">
                        <input type = "button" onclick = "searchQuestions(this.form)" value = "Search">
                    </form>
                </div>
                <ol id = "eqBank">
                    
                </ol> 
            </div>
        </div>
        <div id = "manageExam">
            <div class = "half">
                <div id = "activateExam" class = "activateExam"> 
                    <h2> Activate an exam </h2>
                    <form>
                        <label for = "activateName"> Exam Name: </label>
                        <input type = "text" id = "activateName" name = "activateName" placeholder = "Ex: Exam 1">
                        <input type = "button" class = "submitButton" onclick = "activateExam(this.form)" value = "Activate Exam">
                    </form>
                    <br>
                    <div id = "activateExamStatusCode">
                        
                    </div>
                </div>
                <br>
                <div id = "auotgradeExam" class = "autogradeExam"> 
                    <h2> Autograde an exam </h2>
                    <form>
                        <label for = "agName"> Exam Name: </label>
                        <input type = "text" id = "agName" name = "agName" placeholder = "Ex: Exam 1">
                        <input type = "button" class = "submitButton" onclick = "autogradeExam(this.form)" value = "Autograde Exam">
                    </form>
                    <br>
                    <div id = "autogradeExamStatusCode">

                    </div>
                </div>
                <br>
                <div id = "releaseExam" class = "releaseExam"> 
                    <h2> Release an exam </h2>
                    <form>
                        <label for = "releaseName"> Exam Name: </label>
                        <input type = "text" id = "releaseName" name = "releaseName" placeholder = "Ex: Exam 1">
                        <input type = "button" class = "submitButton" onclick = "releaseExam(this.form)" value = "Release Exam">
                    </form>
                    <br>
                    <div id = "releaseExamStatusCode">

                    </div>
                </div>
            </div>
            <div class = "half">
                <h2> Exam List </h2>
                <input type = "button" onclick = "listExams()" value = "Refresh">
                <ol id = "eBank">
                    
                </ol> 
            </div>
        </div>
        <div id = "reviewExam" class = "reviewExam">
            <div id = "adjustExam" class = "adjustExam"> 
                <h2> Manually review an exam </h2>
                <form>
                    <label for = "adjustName"> Exam Name: </label>
                    <input type = "text" id = "adjustName" name = "adjustName" placeholder = "Ex: Exam 1">
                    <input type = "button" class = "submitButton" onclick = "getStudentExams(this.form)" value = "Review Exam">
                </form>
                <br>
                <div id = "adjustExamStatusCode">
                    
                </div>
                <div>
                    <h2 id = "adjustingName">  </h2>
                    <h3 id = "studentName">   </h3>
                    <table>
                        <thead>
                            <tr>
                                <th> Question </th>
                                <th> Response </th>
                                <th> Input </th>
                                <th> Output </th>
                                <!-- <th> Expected Output </th> -->
                                <th> Input </th>
                                <th> Output </th>
                                <!-- <th> Expected Output </th> -->
                                <th> Autograde Score </th>
                                <th> Max Score </th>
                                <th> Revised Score </th>
                            </tr>
                        </thead>
                        <tbody id = "examValues">

                        </tbody>
                    </table>
                    <input type = "button" class = "submitButton" onclick = "submitAdjustments()" value = "Update Score">
                </div>
            </div>
        </div>
    </body>
</html>