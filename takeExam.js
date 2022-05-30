var titleName = document.getElementById("pagename").innerHTML;
var examName = titleName.trim();
var username = document.getElementById("aUsername").innerHTML;
var examData;
var qList = [];
var allQList;
var q1Data = [];
var q2Data = [];
var q3Data = [];
var q4Data = [];
var q5Data = [];
var q6Data = [];
var currQ = 0;
var responses = [];
/* 
function getVisibleDiv() {
  const visibleDiv = divs.find(div => div.style.display === 'block');
  return visibleDiv;
}

function next() {
  const visibleDiv = getVisibleDiv();
  visibleDiv.style.display = 'none';
  if (visibleDiv.nextElementSibling.className === 'container')
    visibleDiv.nextElementSibling.style.display = 'block';
  else {
    divs[0].style.display = 'block';
  }
}

function previous() {
  const visibleDiv = getVisibleDiv();
  visibleDiv.style.display = 'none';
  if (visibleDiv.previousElementSibling.className === 'container')
    visibleDiv.previousElementSibling.style.display = 'block';
  else {
    divs[divs.length - 1].style.display = 'block';
  }
}
*/
function submitExam(form) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            // Iterate through each exam
            console.log(response);
        }
    };

    responses = [
        {
            "questionName" : "doubleUp",
            "input" : "t1:4,t2:5",
            "testCasesPoints": "t1:,t2:",
            "autoGradedPoints" :"t1:,t2:",
            "output" :"t1:8,t2:10",
            "functionInput": "def add(a): \r\treturn a * 2",
            "functionOutput": "t1:,t2:",
            "constraint": ""
        },
        {
            "questionName" : "fiveCases",
            "input" : "t1:'+',t2:'-',t3:'*',t4:'/',t5:'invalid'",
            "testCasesPoints": "t1:0,t2:0,t3:0,t4:0,t5:0",
            "autoGradedPoints" :"t1:0,t2:0,t3:0,t4:0,t5:0",
            "output" :"t1:10,t2:6,t3:16,t4:4,t5:-1",
            "functionInput": "def fiveCases(op, a, b):\r\tif op == '+':\r\t\treturn a + b\r\telif op == '-':\r\t\treturn a - b\r\telif op == '*':\r\t\treturn a * b\r\telif op == '/':\r\t\treturn a / b\r\telse:\r\t\treturn -1",
            "functionOutput": "t1:0,t2:0,t3:0,t4:0,t5:0",
            "constraint": ""
        },
        {
            "questionName" : "combineStrings",
            "input" : "t1:'hello','world',t2:'string1','string2'",
            "testCasesPoints": "t1:,t2:",
            "autoGradedPoints" :"t1:,t2:",
            "output" :"t1:'hello world',t2:'string1 string2'",
            "functionInput": "def combineStrings(a, b): \r\treturn a + ' ' + b",
            "functionOutput": "t1:,t2:",
            "constraint": ""
        }
    ]

    var sendData = 'username=' + 'qwerty' + '&examname="Exam1"&finalGrade=""&responses=' + responses;
    var coded = JSON.stringify(sendData);
    console.log(coded);

    request.open("GET", "submitTypes/submitExam.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('username="qwerty"&examname="Exam1"&finalGrade=""&responses=' + responses);
}
/*
function loadQuestions() {

    console.log(examData);
    console.log("Loading questions");

    var numQ = examData.questions.length;
    for (var i = 0; i < numQ; i++) {
        //qList[i] = examData.questions[i].functionName;
    }
    console.log(qList);
    if (numQ <= 1) {
        var qName = qList[0].functionName;
        if (allQList.includes(qName)) {
            var pos = allQList.indexo
        }
    }
    if (numQ <= 2) {
        var qName = qList[1].functionName;
        q2Data[0] = qName;
    }
    if (numQ <= 3) {
        var qName = qList[2].functionName;
        q3Data[0] = qName;
    }
    if (numQ <= 4) {
        var qName = qList[3].functionName;
        q1Data[0] = qName;
    }
    if (numQ <= 5) {
        var qName = qList[4].functionName;
        q1Data[0] = qName;
    }
    if (numQ <= 6) {
        var qName = qList[5].functionName;
        q1Data[0] = qName;
    }

}
*/
function loadExam() {
    //console.log(examName);
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        //console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            // Iterate through each exam
            for (var i = 0; i < response.length; i++) {
                var exam = response[i];
                //console.log(exam.name);
                if (exam.name == examName) {
                    //console.log(exam);
                    //console.log("hello");
                    examData = exam;
                    //loadQuestions();
                }
            }
        }
    };
    request.open("GET", "submitTypes/getActivatedExams.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();   
}
