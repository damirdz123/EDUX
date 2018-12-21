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

const signUpEmail = document.querySelector("#signup input[type='email']");
const signUpPassword = document.querySelector("#signup input[type='password']");
const signUpButton = document.querySelector("#signup .submit");
const signUpMsg = document.querySelector("#signup p");

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
