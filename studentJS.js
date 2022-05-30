// Toggle functionality for the tabs
function toggleTExam() {
    document.getElementById("reviewExams").style.display = "none";
    document.getElementById("takeExams").style.display = "block";
}
function toggleRExam() {
    document.getElementById("takeExams").style.display = "none";
    document.getElementById("reviewExams").style.display = "block";
}
function hideElement() {
    document.getElementById("takeExams").style.display = "none";
    document.getElementById("reviewExams").style.display = "none";
}
// Script to support tabs inside text box
function insertTab() {
    
    var textbox = document.getElementsByTagName('textarea');
    var count = textbox.length;
    
    for(var i = 0; i < count; i++){
        
        textbox[i].onkeydown = function(e){

            if(e.key === 9){
                
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1; 
            
            }
        }
    }
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
// Get questions in an exam, load them on screen.
// Expects an array of questions: 
//  [funcName, instructions, test case 1 I/O, test case 2 I/O, point value,
//   funcName, instructions, test case 1 I/O, test case 2 I/O, point value,
//   etc
//  ] 
function getExamData(anExam) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            resetFields();
            var response = JSON.parse(this.responseText);
            // Iterate through each question in the exam
            for (var i = 0; i < response.length; i++) {
                var question = response[i];
                console.log(question);
                // Add question to question list
                examQuestions.push(question[0].funcName);
                // Create element containing instructions and test cases
                var questionData = document.createElement("p");
                questionData.innerHTML = counter + ". " + question.funcName + ": " + question.instructions + "\n" + 
                    "Test case input: " + question.tc1I + ", Expected output: " + question.tc1O + "\n" +
                    "Test case input: " + question.tc2I + ", Expected output: " + question.tc2O + "\n" +
                    "Points: " + question.points;
                // Create element containing text box for student response
                var responseSpace = document.createElement("textarea");
                responseSpace.setAttribute("class", "responseArea");
                responseSpace.setAttribute("id", "response" + counter);
                counter++;
                // Add instruction and response elements to page
                document.getElementById("response").appendChild(questionData);
                document.getElementById("response").appendChild(responseSpace);           
            }
        }
    };
    request.open("POST", "submitTypes/getExamData.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('exName=' + anExam);
    
}
// Get questions in an exam, load them on screen.
// Expects an array of questions: 
//  [funcName, instructions, response, test case 1 I/O and result, test case 2 I/O and result, point value, points earned,
//   funcName, instructions, response, test case 1 I/O and result, test case 2 I/O and result, point value, points earned,
//   etc
//  ] 
function viewExam(anExam) {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            resetFields();
            var response = JSON.parse(this.responseText);
            // Iterate through each question in the exam
            for (question in response) {
                
                console.log(question);
                // Create element containing results
                var questionData = document.createElement("p");
                var instructions = counter + ". " + question.funcName + ": " + question.instructions + "\n";
                var answer = question.answer + "\n";
                var testCase1 = "Test case 1 I/O: " + question.tc1I + " -> " + question.tc1O;
                var testCase2 = "Test case 2 I/O: " + question.tc2I + ", " + question.tc2O + "\n";
                questionData.innerHTML = counter + ". " + question.funcName + ": " + question.instructions + "\n" + 
                    "Test case input: " + question.tc1I + ", Expected output: " + question.tc1O + "\n" +
                    "Test case input: " + question.tc2I + ", Expected output: " + question.tc2O + "\n" +
                    "Points: " + question.points;
                // Create element containing text box for student response
                var responseSpace = document.createElement("textarea");
                responseSpace.setAttribute("class", "responseArea");
                responseSpace.setAttribute("id", "response" + counter);
                counter++;
                // Add instruction and response elements to page
                document.getElementById("response").appendChild("questionData");
                document.getElementById("response").appendChild("responseSpace");           
            }
        }
    };
    request.open("POST", "submitTypes/viewExam.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('exName=' + anExam);
    
}
// Get list of activated exams, generate buttons to select an exam
// Expects an array of exam names: [exam1, exam2, exam3, etc]
function getActivatedExams() {
    
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            // Iterate through each exam
            for (var i = 0; i < response.length; i++) {
                var exam = response[i];
                //console.log(exam);
                var isActive = exam.activated;
                //console.log(isActive);
                if (isActive == 'true') {
                    //console.log(exam);
                    //console.log("hello");
                    var exName = exam.name;
                    // Create button for selecting the exam
                    var readyExam = document.createElement("button");
                    readyExam.setAttribute("class", "submitButton");
                    readyExam.setAttribute("onclick", "window.location.assign('studentTakeExam.php?exam=" + exName + "')");
                    readyExam.innerHTML = exName;

                    document.getElementById("selectExam").appendChild(readyExam);
                }
            }
        }
    };
    request.open("GET", "submitTypes/getActivatedExams.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();   
}
// Get list of released exams, generate buttons to select an exam
// Expects an array of exam names: [exam1, exam2, exam3, etc]
function getReleasedExams() {
    
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            // Iterate through each activated exam
            for (var i = 0; i < response.length; i++) {
                var exam = response[i];
                //console.log(exam);
                var exName = exam.name;
                // Create button for selecting the exam
                var readyExam = document.createElement("button");
                readyExam.setAttribute("class", "submitButton");
                readyExam.setAttribute("onclick", "viewExam(" + exName + ")");
                readyExam.innerHTML = exName;

                document.getElementById("selectReleasedExam").appendChild(readyExam);
           
            }
        }
    };
    request.open("GET", "submitTypes/getActivatedExams.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();   
}
// Student submit exam
function submitExam() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            
        }
    };
    
    var fullResponse = [];
    // Iterate through student responses
    for (var i = 0; i < counter; i++) {

        var questionName = examQuestions[i];
        var questionResponse = document.getElementById("response" + (i + 1)).value;
        console.log(questionResponse);
        fullResponse.append(questionName, questionResponse);

    }

    request.open("POST", "submitTypes/submitExam.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('fName=' + firstName + '&lName=' + lastName + 'exName=' + examName + '&answers=' + fullResponse);

}