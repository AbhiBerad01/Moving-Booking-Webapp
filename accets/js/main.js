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