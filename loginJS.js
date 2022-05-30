function loginUser(form) {

    var request = new XMLHttpRequest();

    // Detect responses from server
    request.onreadystatechange = function() {
        
        // Response received and processed
        console.log(request);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            //console.log(response);
            // Determine if user is a student or teacher
            // Notification of invalid login info if response isn't student or teacher
            if (response.status == 'STUDENT') {
                window.location.assign("studentLanding.php");
            }
            else if (response.status == 'TEACHER') {
                window.location.assign("teacherLanding.php");
            }
            else {document.getElementById('invalid').innerHTML = "Invalid username or password."}

        }

    };
    //console.log('username=' + form.uname.value + '&password=' + form.pword.value);
    // Send form data to login php doc for processing via POST
    request.open("POST", "submitTypes/login.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('username=' + form.uname.value + '&password=' + form.pword.value);
}