var currentStudent = 0;
var totalStudent = 0;

function toggleQuestions() {
    document.getElementById("createExam").style.display = "none";
    document.getElementById("manageExam").style.display = "none";
    document.getElementById("reviewExam").style.display = "none";
    document.getElementById("createQuestions").style.display = "block";
}
function toggleCExam() {
    document.getElementById("createQuestions").style.display = "none";
    document.getElementById("manageExam").style.display = "none";
    document.getElementById("reviewExam").style.display = "none";
    document.getElementById("createExam").style.display = "block";
}
function toggleMExam() {
    document.getElementById("createQuestions").style.display = "none";
    document.getElementById("createExam").style.display = "none";
    document.getElementById("reviewExam").style.display = "none";
    document.getElementById("manageExam").style.display = "block";
}
function toggleRExam() {
    document.getElementById("createExam").style.display = "none";
    document.getElementById("manageExam").style.display = "none";
    document.getElementById("createQuestions").style.display = "none";
    document.getElementById("reviewExam").style.display = "block";
}
function resetFields() {

    // Set current exam to the selected exam
    currentExam = "";
    // Empty question list (from any previous exams taken)
    examQuestions = [];
    counter = 1;
    
    var responseArea = document.getElementById("response");

    while (responseArea.firstChild) {
        responseArea.removeChild(responseArea.firstChild);
    }
}
function loadStudent(examList, currentStudent) {
    
    // Get student name and a list of their exam responses
    document.getElementById('studentName').innerHTML = "";
    document.getElementById('examValues').innerHTML = "";

    var studName = examList[currentStudent].studentName;
    var studExam = examList[currentStudent].questionResponses;
    var totalPoints = 0;
    var totalMaxPoints = 0;

    document.getElementById('studentName').innerHTML = studName;
    // Go through each question in the exam
    for (var j = 0; j < studExam.length; j++) {

        var qName = studExam[j].questionName;
        var qResponse = studExam[j].response;
        var maxPoints = studExam[j].maxPoint;
        var t1Input = studExam[j].input.t1;
        var t2Input = studExam[j].input.t2;
        var t1Output = studExam[j].output.t1;
        var t2Output = studExam[j].output.t2;
        //var t1Expected = studExam[j].expected.t1;
        //var t2Expected = studExam[j].expected.t2;
        var t1Auto = studExam[j].autoGradedPoints.t1;
        var t2Auto = studExam[j].autoGradedPoints.t2;
        var autoBoth = t1Auto + t2Auto;
        var t1Adjusted = studExam[j].testCasePoints.t1;
        var t2Adjusted = studExam[j].testCasePoints.t2;
        var adjBoth = t1Adjusted + t2Adjusted;

        var row = document.createElement('tr');
        var rowQ = document.createElement('td');
        rowQ.innerHTML = qName;
        var rowR = document.createElement('td');
        rowR.innerHTML = qResponse;
        var row1I = document.createElement('td');
        row1I.innerHTML = t1Input;
        var row1O = document.createElement('td');
        row1O.innerHTML = t1Output;
        //var row1E = document.createElement('td');
        //row1E.innerHTML = t1Expected;
        var row2I = document.createElement('td');
        row2I.innerHTML = t2Input;
        var row2O = document.createElement('td');
        row2O.innerHTML = t2Output;
        //var row2E = document.createElement('td');
        //row2E.innerHTML = t2Expected;
        var rowAuto = document.createElement('td');
        rowAuto.innerHTML = autoBoth;
        var rowMax = document.createElement('td');
        rowMax.innerHTML = maxPoints;
        var rowRev = document.createElement('td');
        var pointField = document.createElement('input');
        pointField.setAttribute("type", "number");
        pointField.setAttribute("id", "question" + (j + 1));
        pointField.setAttribute("value", adjBoth);
        rowRev.appendChild(pointField);

        row.appendChild(rowQ);
        row.appendChild(rowR);
        row.appendChild(row1I);
        row.appendChild(row1O);
        //row.appendChild(row1E);
        row.appendChild(row2I);
        row.appendChild(row2O);
        //row.appendChild(row2E);
        row.appendChild(rowAuto);
        row.appendChild(rowMax);
        row.appendChild(rowRev);

    }

}
function createQuestion(form) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            if (response == 'SUCCESS') {document.getElementById('createQStatusCode').innerHTML = "Question created."}
            else if (response == 'DUPLICATE') {document.getElementById('createQStatusCode').innerHTML = "Question already exists."}
            else {document.getElementById('createQStatusCode').innerHTML = "Error creating question."}
        }
    };
    if (form.pyFunc.value == '' || form.instructions.value == '' || form.tc1I.value == '' || form.tc1O.value == '' || form.tc2I.value == '' || form.tc2O.value == '') {
        document.getElementById('createQStatusCode').innerHTML = "Please fill out all fields."
        return;
    }
    else {
        var qRequest = 'funcName=' + form.pyFunc.value + '&instructions=' + form.instructions.value +
        '&difficulty=' + form.difficulty.value + '&topic=' + form.topic.value + 
        '&constraint=' + form.constraint.value + '&tcNum=' + form.numTC.value +
        '&tc1I=' + form.tc1I.value + '&tc1O=' + form.tc1O.value +
        '&tc2I=' + form.tc2I.value + '&tc2O=' + form.tc2O.value;
        if (form.numTC.value == 3) {
            var tc3 = '&tc3I=' + form.tc3I.value + '&tc3O=' + form.tc3O.value;
            qRequest += tc3;
        }
        if (form.numTC.value == 4) {
            var tc4 = '&tc4I=' + form.tc4I.value + '&tc4O=' + form.tc4O.value;
            qRequest += tc4;
        }
        if (form.numTC.value == 5) {
            var tc5 = '&tc5I=' + form.tc5I.value + '&tc5O=' + form.tc5O.value;
            qRequest += tc5;
        }
        console.log(qRequest);
        request.open("POST", "submitTypes/createQuestion.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(qRequest);
    }
}
function listQuestions() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response);
            document.getElementById('qBank').innerHTML = "";
            document.getElementById('eqBank').innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                //console.log(response[i]);
                // Create list element for a single question
                var listQ = document.createElement("li");
                // Question IS
                listQ.setAttribute("id", response[i].functionName);
                listQ.setAttribute("class", "aQuestion");
                // Question Data
                var qData = document.createTextNode(response[i].functionName + ': ' + response[i].instructions + ". Difficulty: " + response[i].difficulty);
                
                // Attach instructions to question
                listQ.appendChild(qData)
                // Add question to list
                document.getElementById('qBank').appendChild(listQ);

                var listEQ = document.createElement("li");
                // Question ID
                listEQ.setAttribute("id", response[i].functionName);
                listEQ.setAttribute("class", "aEQuestion");
                // Question Data
                var eqData = document.createTextNode(response[i].functionName + ': ' + response[i].instructions+ ". Difficulty: " + response[i].difficulty);
                
                // Attach instructions to question
                listEQ.appendChild(eqData)
                // Add question to list
                document.getElementById('eqBank').appendChild(listEQ);

            }
        }
    };

    request.open("POST", "submitTypes/listQuestions.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();
}
function listExams() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            
            document.getElementById('eBank').innerHTML = "";

            for (var i = 0; i < response.length; i++) {
                //console.log(response[i]);
                // Create list element for a single question
                var listE = document.createElement("li");
                // Exam IS
                listE.setAttribute("id", response[i].name);
                listE.setAttribute("class", "anExam");
                // Exam Data
                var eData = document.createTextNode(response[i].name);
                var questionList = document.createElement("ol");
                var questions = response[i].questions;
                for (var j = 0; j < questions.length; j++) {

                    var aQuestion = document.createElement("li");
                    aQuestion.setAttribute("id", questions[j].functionName);
                    var qInfo = document.createTextNode(questions[j].functionName + ", " + questions[j].points + " points.");

                    aQuestion.appendChild(qInfo);
                    questionList.appendChild(aQuestion);

                }
                // Attach instructions to question
                listE.appendChild(eData);
                listE.appendChild(questionList);
                // Add question to list
                document.getElementById('eBank').appendChild(listE);

            }
        }
    };

    request.open("POST", "submitTypes/listExams.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();

}
function addQuestion() {

    var currQ = document.getElementById("examQ").children.length;

    if (currQ < 10) {
    
        var newQ = document.createElement("input");
        newQ.setAttribute("type", "text");
        newQ.setAttribute("id", "examQ" + (currQ + 1));
        newQ.setAttribute("class", "examQ");
        newQ.setAttribute("placeholder", "Question name");

        var qPoints = document.createElement("input");
        qPoints.setAttribute("type", "number");
        qPoints.setAttribute("id", "qPoints" + (currQ + 1));
        qPoints.setAttribute("class","qPoints");
        qPoints.setAttribute("placeholder", "Point value");

        var qBreak = document.createElement("br");
        var pBreak = document.createElement("br");

        document.getElementById("examQ").appendChild(newQ);
        document.getElementById("examQ").appendChild(qBreak);
        document.getElementById("qPoints").appendChild(qPoints);
        document.getElementById("qPoints").appendChild(pBreak);
    }

    var newCurrQ = document.getElementById("examQ").children.length;

    if (newCurrQ >= 10) {

        document.getElementById("addQ").classList.add("disabled");

    }
}
function removeQuestion() {

    var questions = document.getElementById("examQ");
    var points = document.getElementById("qPoints");

    questions.removeChild(questions.lastChild);
    questions.removeChild(questions.lastChild);
    points.removeChild(points.lastChild);
    points.removeChild(points.lastChild);

    document.getElementById("addQ").classList.remove("disabled");

}
function createExam() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            if (response == 'SUCCESS') {
                document.getElementById('createExamStatusCode').innerHTML = "Exam created."
            }
            else {
                document.getElementById('createExamStatusCode').innerHTML = "Exam exists already."
            }
        }
    };

    var currQ = (document.getElementById('examQ').children.length/2);
    //console.log(currQ);
    var exName = document.getElementById('exName').value;
    if (exName == '') {
        document.getElementById('createExamStatusCode').innerHTML = "Please enter an exam name."
        return;
    }
    else {
        //console.log(exName);
        const examQuestions = [];

        for (var i = 1; i <= currQ + 2; i += 2) {
            var qName = document.getElementById('examQ' + i).value;
            var qPoints = document.getElementById('qPoints' + i).value;
            //console.log(qName + ' ' + qPoints);
            
            if (qName == '' || qPoints == '') {
                document.getElementById('createExamStatusCode').innerHTML = "Please fill out all fields."
                return;
            }
            else {
                examQuestions.push(qName, qPoints);
            }

        }
        var examRequest = 'exName=' + exName + '&questions=' + examQuestions + '&activated=false';
        console.log(examRequest);
        request.open("POST", "submitTypes/createExam.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(examRequest);
    }
}
function activateExam(form) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            if (response == 'SUCCESS') {document.getElementById('activateExamStatusCode').innerHTML = "Exam Activated."}
            else {document.getElementById('activateExamStatusCode').innerHTML = "Error activating exam. Make sure the exam exists and the name is spelt correctly."}
        }
    };
    var examName = form.activateName.value;
    if (examName == '') {document.getElementById('activateExamStatusCode').innerHTML = "Please enter an exam name."}
    else {
        request.open("POST", "submitTypes/activateExam.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('exName=' + examName);
    }
}
function autogradeExam(form) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            if (response.status == 'SUCCESS') {document.getElementById('autogradeExamStatusCode').innerHTML = "Exam autograded."}
            else if (response.status == 'alreadyGraded') {document.getElementById('autogradeExamStatusCode').innerHTML = "Exam autograded already."}
            else {document.getElementById('autogradeExamStatusCode').innerHTML = "Error autograding exam."}
        }
    };
    var examName = form.agName.value;
    if (examName == '') {document.getElementById('autogradeExamStatusCode').innerHTML = "Please enter an exam name."}
    else {
        request.open("POST", "submitTypes/autogradeExam.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('exName=' + examName);
    }
}
function releaseExam(form) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            if (response.status == 'SUCCESS') {document.getElementById('releaseExamStatusCode').innerHTML = "Exam Released."}
            else if (response.status == 'alreadyReleased') {document.getElementById('releaseExamStatusCode').innerHTML = "Exam released already."}
            else {document.getElementById('releaseExamStatusCode').innerHTML = "Error releasing exam."}
        }
    };
    var examName = form.releaseName.value;
    if (examName == '') {document.getElementById('releaseExamStatusCode').innerHTML = "Please enter an exam name."}
    else {
        request.open("POST", "submitTypes/releaseExam.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('exName=' + examName);
    }
}
function loadCases() {
    var numTC = document.getElementById("numTC").value;
    var tcSpace = document.getElementById("questionParam");
    var tEle = document.getElementById("questionParam").childElementCount;
    //console.log(tEle);
    for (var i = tEle; tEle > 6; tEle--) {
        //console.log('removing element')
        tcSpace.removeChild(tcSpace.lastElementChild);
    }
    for (var i = 1; i <= numTC; i++) {
        //console.log(i);

        var tcIPara = document.createElement("p");
        
        var tcILabel = document.createElement("label");
        tcILabel.setAttribute("for", "tc" + i + "I")
        tcILabel.innerHTML = "Test Case " + i + " Input: "
        
        var tcInput = document.createElement("input");
        tcInput.setAttribute("type", "text");
        tcInput.setAttribute("id", "tc" + i + "I");
        tcInput.setAttribute("name", "tc" + i + "I");

        tcIPara.appendChild(tcILabel);
        tcIPara.appendChild(tcInput);
        tcSpace.appendChild(tcIPara);

        var tcOPara = document.createElement("p");
        
        var tcOLabel = document.createElement("label");
        tcOLabel.setAttribute("for", "tc" + i + "O")
        tcOLabel.innerHTML = "Test Case " + i + " Output: "
        
        var tcOutput = document.createElement("input");
        tcOutput.setAttribute("type", "text");
        tcOutput.setAttribute("id", "tc" + i + "O");
        tcOutput.setAttribute("name", "tc" + i + "O");

        tcOPara.appendChild(tcOLabel);
        tcOPara.appendChild(tcOutput);
        tcSpace.appendChild(tcOPara);
    }
    var formSub = document.createElement("input");
    formSub.setAttribute("type", "button");
    formSub.setAttribute("onclick", "createQuestion(this.form)");
    formSub.setAttribute("value", "Submit");

    tcSpace.appendChild(formSub);
}
function searchQuestions(form) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            document.getElementById('qBank').innerHTML = "";
            document.getElementById('eqBank').innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                console.log(response[i]);
                console.log(form.cqsDifficulty.value);
                console.log(form.cqsTopic.value);
                console.log(form.cqsKeyword.value);
                console.log(response[i].difficulty);
                console.log(response[i].topic);
                console.log(response[i].functionName);

                // Create list element for a single question
                if ((response[i].difficulty == form.cqsDifficulty.value || form.cqsDifficulty.value == 'Any') &&
                        (response[i].topic == form.cqsTopic.value || form.cqsTopic.value == 'Any') &&
                        (response[i].functionName.includes(form.cqsKeyword.value) || response[i].instructions.includes(form.cqsKeyword.value) ||
                            form.cqsKeyword.value == '')) {
                    var listQ = document.createElement("li");
                    // Question IS
                    listQ.setAttribute("id", response[i].functionName);
                    listQ.setAttribute("class", "aQuestion");
                    // Question Data
                    var qData = document.createTextNode(response[i].functionName + ': ' + response[i].instructions + ". Difficulty: " + response[i].difficulty);
                    
                    // Attach instructions to question
                    listQ.appendChild(qData)
                    // Add question to list
                    document.getElementById('qBank').appendChild(listQ);

                    var listEQ = document.createElement("li");
                    // Question ID
                    listEQ.setAttribute("id", response[i].functionName);
                    listEQ.setAttribute("class", "aEQuestion");
                    // Question Data
                    var eqData = document.createTextNode(response[i].functionName + ': ' + response[i].instructions+ ". Difficulty: " + response[i].difficulty);
                    
                    // Attach instructions to question
                    listEQ.appendChild(eqData)
                    // Add question to list
                    document.getElementById('eqBank').appendChild(listEQ);
                
                }

            }
        }
    };

    request.open("POST", "submitTypes/listQuestions.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();
}