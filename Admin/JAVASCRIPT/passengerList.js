document.addEventListener("DOMContentLoaded", function () {
    var currentDate = new Date().toLocaleDateString();
    document.getElementById("current-date").textContent = currentDate;
})

let dark = document.cookie
.split("; ")
.find((row) => row.startsWith("isDark="))
?.split("=")[1]
if(dark == 'true')
{
    var body = document.body;
    body.classList.toggle("dark-mode");
}

let seats = JSON.parse(sessionStorage.getItem('flightSeatData'))
console.log(seats)
let count = 1
let table = document.querySelector('tbody')

for (let i = 0; i < seats.length; i++) {
    if (seats[i].PassengerName != null) {
        let rowI = table.insertRow(table.rows.length)

        let cell0 = rowI.insertCell(0)
        cell0.innerHTML = count++

        let cell1 = rowI.insertCell(1)
        cell1.innerHTML = seats[i].seatNo

        let cell2 = rowI.insertCell(2)
        cell2.innerHTML = seats[i].PassengerName

        let cell3 = rowI.insertCell(3)
        cell3.innerHTML = seats[i].PassengerMNumber

        let cell4 = rowI.insertCell(4)
        cell4.innerHTML = seats[i].PassengerDOB

        let cell5 = rowI.insertCell(5)
        cell5.innerHTML = seats[i].Class

        let cell6 = rowI.insertCell(6)
        cell6.innerHTML = seats[i].Price
    }
}

function toggleDarkMode() {
    const checkbox = document.getElementById("hide-checkbox");
    const body = document.body;
    
    if (checkbox.checked) {
      body.classList.add("dark-mode");
      document.cookie = "isDark=true; path=/;";
    } else {
      body.classList.remove("dark-mode");
      document.cookie = "isDark=false; path=/;";
    }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("hide-checkbox");
    const dark = document.cookie
      .split("; ")
      .find((row) => row.startsWith("isDark="))
      ?.split("=")[1];
    
    if (dark === "true") {
      checkbox.checked = true;
      document.body.classList.add("dark-mode");
    } else {
      checkbox.checked = false;
    }
    });

