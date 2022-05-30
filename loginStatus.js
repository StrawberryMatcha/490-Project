/* Login scripts */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    let username = getCookie("username");
    
    if (username == "") {
        window.location.replace("index.php");
    }
    else {
        document.getElementById('name').innerHTML = "Welcome, " + username;
    }
}
function logoutUser() {
    document.cookie = "username=; expires=Mon, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign("index.php");
}

/* Teacher Scripts */