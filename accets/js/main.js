

const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))||[];
let notLogged = document.getElementById("notLogged");
let logged = document.getElementById("logged");
let logout_b = document.getElementById("logout-btn");
if(loggedIn.length != 0)
{
    notLogged.style.display = 'none';
    logged.style.display = 'flex';
    logout_b.style.display = 'block';
    logged.innerHTML = `Welcome back ! ${loggedIn[0].User_name}`
}
else{
    notLogged.style.display = 'flex';
    logged.style.display = 'none';
    logout_b.style.display = 'none';

}

function logout() {
    localStorage.removeItem('loggedIn');
    notLogged.style.display = 'flex';
    logged.style.display = 'none';
    logout_b.style.display = 'none';
}

function booking() {
    if(loggedIn.length != 0)
{window.location.href = "/templates/bookTickets.html";}
else{
    window.location.href = "/templates/signin.html"
}
}
function nowShowing() {
    if(loggedIn.length != 0)
{window.location.href = "/templates/nowShowing.html";}
else{
    window.location.href = "/templates/signin.html"
}
}

function toggleNav()
{
    let h_drop = document.getElementById("hamburger-dropdown");
    const element = document.getElementsByName('deactivate')[0];
    const element2 = document.getElementsByName('activate')[0];
    let nav = document.getElementById("nav");
    let on = h_drop.getAttribute("name");
    if(on == "deactivate")
    {
        nav.style.height="25vh";
    h_drop.style.display = "block";
    element.setAttribute('name', 'activate');
    }
    if(on =="activate"){
        nav.style.height="3.5rem";
        h_drop.style.display = "none"; 
        element2.setAttribute('name', 'deactivate');
    }
    console.log(h_drop.getAttribute("name"));
}


