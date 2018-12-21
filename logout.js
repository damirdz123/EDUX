const logoutButton = document.querySelector("#logout");

//Logout user
logoutButton.addEventListener("click", logoutUser);

function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Succesfull logout");
    })
    .catch(function(error) {
      // An error happened.
      console.log(err);
      l;
    });
}
