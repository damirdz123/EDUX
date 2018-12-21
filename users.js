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
    phone: form.phone.value
  });
});

//
