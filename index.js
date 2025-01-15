import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-a536c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "myLeads")

onValue(referenceInDB, function(snapshot) {
    console.log(snapshot)
})

//let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
//const tabBtn = document.getElementById("tab-btn")

/* let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
if(leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    render(myLead)
} */

function render(leads) {
    let leadItems = ""
    for(let i = 0; i < leads.length; i++) {
        leadItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
                ${leads[i]}
            <a/>
        </li>
        `
    }
    ulEl.innerHTML = leadItems
}

onValue(referenceInDB, function(snapshot) {
    const check = snapshot.exists()
    if(check) {
      const snapshotValues = snapshot.val()
      const leads = Object.values(snapshotValues)
      render(leads)
    }
    
})

/* tabBtn.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLead.push(tabs[0].url);
            localStorage.setItem("myLead", JSON.stringify(myLead));
            render(myLead);
        });
}) */



deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
    //localStorage.clear("myLead")
    //myLead = []
    //render(myLead)
})

inputBtn.addEventListener("click", function() {
    //myLead.push(inputEl.value)
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
    //localStorage.setItem("myLead", JSON.stringify(myLead))
    //render(myLead)
}) 

/* function writeTestData() {
    const dbRef = ref(database, "TestConnection/");
    set(dbRef, "Connection Successful!")
      .then(() => {
        console.log("Data written to Firebase!");
      })
      .catch((error) => {
        console.error("Error writing to Firebase:", error);
      });
  }

  writeTestData(); */

  /* function readTestData() {
    const dbRef = ref(database);
    get(child(dbRef, "TestConnection/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Data from Firebase:", snapshot.val());
        } else {
          console.log("No data found!");
        }
      })
      .catch((error) => {
        console.error("Error reading from Firebase:", error);
      });
  }
  
  readTestData(); */
