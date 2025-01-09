let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
if(leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    render(myLead)
}

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

tabBtn.addEventListener("click", function() {
    /* chronme.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        render(myLead)
    }) */
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLead.push(tabs[0].url);
            localStorage.setItem("myLead", JSON.stringify(myLead));
            render(myLead);
        });
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear("myLead")
    myLead = []
    render(myLead)
})

inputBtn.addEventListener("click", function() {
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)
})
