
const signInForm = document.getElementById("signIn-form");
signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting


    const registration = JSON.parse(localStorage.getItem('registration'))||[];
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))||[];
    const Registration_id = document.getElementById("reg-id").value;
    const User_name = document.getElementById("username").value;
    const Password = document.getElementById("password").value;
    console.log(registration,"h");
    var alreadyExist = 0;
    for(let i=0;i<registration.length;i++)
    {
        if(registration[i].Registration_id == Registration_id &&
            registration[i].User_name == User_name &&
            registration[i].Password == Password)
            {
                alreadyExist=1;
                loggedIn.push({
                    Registration_id : Registration_id,
                     User_name: User_name
                });
                
          localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
                window.location.href = "nowShowing.html";
            }
    }
    if(!alreadyExist)
    {
        alert("Credentials not matching");
        signInForm.reset();
    }
});
function cancel(params) {
    try {
        console.log(1);
        signInForm.reset();
    } catch (error) {
        console.log(error);
    }
    
    
}
