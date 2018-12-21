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

const loginEmail = document.querySelector("#login input[type='email']");
const loginPassword = document.querySelector("#login input[type='password']");
const loginButton = document.querySelector("#login .submit");
const loginMsg = document.querySelector("#login p");

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

// Donations list

const todo = document.querySelector("#addTodo input[type='text']");
const addTodo = document.querySelector("#add-todo input[type='submit']");

const todoList = document.querySelector("#todo-list ul");
const todoListMsg = document.querySelector("#todo-list p");
