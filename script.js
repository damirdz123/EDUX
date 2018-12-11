//==============================================================
//==============================================================
// Code needed to initialize firebase
//==============================================================
//==============================================================
// Initialize Firebase
const config = {
  apiKey: "AIzaSyAfObHt5pCM4RRtoLHVD_y0tgY4bL4pMgA",
  authDomain: "edux-form.firebaseapp.com",
  databaseURL: "https://edux-form.firebaseio.com",
  projectId: "edux-form",
  storageBucket: "edux-form.appspot.com",
  messagingSenderId: "1023714302626"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

//==============================================================
//==============================================================
//Our own code to play around with firebase :-)
//==============================================================
//==============================================================
const logoutButton = document.querySelector("#logout");

const signUpEmail = document.querySelector("#signup input[type='email']");
const signUpPassword = document.querySelector("#signup input[type='password']");
const signUpButton = document.querySelector("#signup .submit");
const signUpMsg = document.querySelector("#signup p");

const loginEmail = document.querySelector("#login input[type='email']");
const loginPassword = document.querySelector("#login input[type='password']");
const loginButton = document.querySelector("#login .submit");
const loginMsg = document.querySelector("#login p");

//Signup new user
signUpButton.addEventListener("click", signUpUser);

function signUpUser(e) {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then(() => {
      console.log("Succesfull signup");
      signUpMsg.textContent = "Signup Successfull";
      //fetchTodos();
    })
    .catch(function(error) {
      console.log(error);
      signUpMsg.textContent = "Signup error: " + error.message;
    });
}

//Login user
loginButton.addEventListener("click", loginUser);

function loginUser(e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(user => {
      console.log(user.user.uid);
      localStorage.setItem("uid", user.user.uid); //jonas
      console.log("Succesfull login");
      loginMsg.textContent = "Login Successfull";
      //fetchTodos();
    })
    .catch(function(error) {
      console.log(error);
      loginMsg.textContent = "Login error: " + error.message;
    });
}

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

//Damir - Edux form - USERS db

const form = document.querySelector("#edux-users");

form.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("users").add({
    uid: localStorage.getItem("uid"),
    name: form.name.value,
    lastName: form.lastName.value,
    country: form.country.value,
    addresse: form.address.value,
    phone: form.phone.value,
    email: form.eMail.value
  });
});

const formDonations = document.querySelector("#edux-donation");

formDonations.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("donations").add({
    uid: localStorage.getItem("uid"),
    type: formDonations.type.value,
    ammount: formDonations.ammount.value
  });
});
