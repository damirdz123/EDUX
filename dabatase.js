//
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
