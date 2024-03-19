// Showing date in heading above table
document.addEventListener("DOMContentLoaded", function () {
  var currentDate = new Date().toLocaleDateString();
  document.getElementById("current-date").textContent = currentDate;
});

let dark = document.cookie
.split("; ")
.find((row) => row.startsWith("isDark="))
?.split("=")[1]
if(dark == 'true')
{
  var body = document.body;
  body.classList.toggle("dark-mode");
}


const fetchData = () => {
  let url = "listFlight"

  let p = fetch(url,{method:'POST'})

  p.then((result) => {
      return result.json()
  })
  .then((data) => {
      renderRows(data)
  })
  .catch((err)=>{
      console.log(err)
  })
}

const renderRows = (data) =>{
  console.log(data)
  // flightNo,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,Origin,Via,Destination,
  // Duration,Airline,Status,Seats

  let table = document.querySelector('tbody')
  for(let i=0;i<data.length;i++)
  {
      let rowI = table.insertRow(1)

      let cell0 = rowI.insertCell(0)
      cell0.innerHTML = data[i].flightNo

      let cell1 = rowI.insertCell(1)
      cell1.innerHTML = data[i].Airline

      let cell2 = rowI.insertCell(2)
      cell2.innerHTML = data[i].Origin

      let cell3 = rowI.insertCell(3)
      cell3.innerHTML = data[i].Via

      let cell4 = rowI.insertCell(4)
      cell4.innerHTML = data[i].Destination
      
      let depDT = new Date(data[i].DepDT)
      let cell5 = rowI.insertCell(5)
      cell5.innerHTML = `${depDT.getDate()}/${depDT.getMonth()+1}/${depDT.getFullYear()}`

      let cell6 = rowI.insertCell(6)
      cell6.innerHTML = depDT.toLocaleTimeString([], {timeStyle: 'short'})
      if(data[i].ArvDT == undefined)
      {
          let cell7 = rowI.insertCell(7)
          cell7.innerHTML = "-----"
          let cell8 = rowI.insertCell(8)
          cell8.innerHTML = "-----"
      }
      else{
          let arvDT = new Date(data[i].ArvDT)
          let cell7 = rowI.insertCell(7)
          cell7.innerHTML = `${arvDT.getDate()}/${arvDT.getMonth()+1}/${arvDT.getFullYear()}`
  
          let cell8 = rowI.insertCell(8)
          cell8.innerHTML = arvDT.toLocaleTimeString([], {timeStyle: 'short'})
      }

      let cell9 = rowI.insertCell(9)
      cell9.innerHTML = data[i].Status

      // let div = document.createElement('div')
      // div.className = "show"

      // let button = document.createElement('button')
      // button.innerHTML = "Show"
      // button.onclick = ()=>{sending(data[i].flightNo)}
      // div.appendChild(button)
  
      // let cell10 = rowI.insertCell(10)
      // cell10.appendChild(div)


  }
}

// const sending = (flightNo) =>{
//     window.location.href = `passengerList/${flightNo}`
// }

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