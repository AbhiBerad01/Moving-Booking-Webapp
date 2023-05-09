const signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting


    const registration = JSON.parse(localStorage.getItem('registration'))||[];
    const Registration_id = document.getElementById("reg-id").value;
    const User_name = document.getElementById("username").value;
    const Password = document.getElementById("password").value;
    const Email = document.getElementById("email").value;
    const Mobile = document.getElementById("mobile").value;
    const DOB = document.getElementById("dob").value;
    
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))||[];
    
    var alreadyExist = 0;
    for(let i=0;i<registration.length;i++)
    {
        if(registration[i].Registration_id == Registration_id ||
            registration[i].User_name == User_name ||
            registration[i].Password == Password ||
            registration[i].Email == Email ||
            registration[i].Mobile == Mobile )
            {
                alreadyExist=1;
                break;
            }
    }
    if(!alreadyExist)
    {
        registration.push({
            Registration_id : Registration_id,
            User_name: User_name,
            Password: Password,
            Email : Email,
            Mobile : Mobile,
            DOB : DOB
          });
          // Save the updated cart items to Local Storage
          localStorage.setItem('registration', JSON.stringify(registration));
          loggedIn.push({
            Registration_id : Registration_id,
            User_name: User_name
        });
        
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
          window.location.href = "nowShowing.html";
        }
});
function cancelForm(params) {
    try {
        signupForm.reset();
    } catch (error) {
        console.log(error);
    }
   
}

