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

// donations
const donationsList = document.querySelector("#donations-list");

function renderDonations(doc) {
  let li = document.createElement("li");
  let type = document.createElement("span");
  let ammount = document.createElement("span");
  let uid = document.createElement("span");

  type.textContent = doc.data().type;
  ammount.textContent = doc.data().ammount;
  uid.textContent = doc.data().uid;

  li.appendChild(type);
  li.appendChild(ammount);
  li.appendChild(uid);

  donationsList.appendChild(li);
}

db.collection("donations")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderDonations(doc);
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
