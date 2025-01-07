let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
if(leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    renderLeads()
}

inputBtn.addEventListener("click", function() {
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    renderLeads()
})

function renderLeads() {
    let leadItems = ""
    for(let i = 0; i < myLead.length; i++) {
        leadItems += `
        <li>
            <a href="${myLead[i]}" target="_blank">
                ${myLead[i]}
            <a/>
        </li>
        `
    }
    ulEl.innerHTML = leadItems
}
