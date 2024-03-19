const fetchData = async () => {
  let userName = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userName="))
    ?.split("=")[1]
  let decodedName = decodeURIComponent(userName)
  let modifiedName = decodedName.replaceAll(" ", "&nbsp")
  let userNameDiv = document.getElementById('userName')
  userNameDiv.innerHTML = modifiedName

  let url = `passenger`

  let p = fetch(url, {
    method: 'POST'
  })

  p.then((response) => {
    return response.json()
  })
    .then((data) => {
      console.log(data)
      renderRows(data)
      hover(data)
    })
    .catch((err) => {
      console.log(err)
    })
}


function show(event, content) {
  const popup = document.getElementById("popup");
  popup.innerHTML = content;
  popup.style.display = "block";
}

function position(event) {
  popup.style.left = event.pageX + "px";
  popup.style.bottom = window.innerHeight - event.pageY + "px";
}

function hide() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}



//for remove function in buttons coloumn
const hover = (data) => {
  var row = document.getElementsByName("row");
  for (let i = 0; i < row.length; i++) {
    let bkDate = data[i].BookingDate
    // let bkDate = data.History[i].BookingDate
    var tds = row[i].getElementsByTagName("td");
    for (let j = 0; j < tds.length - 2; j++) {
      var td = tds[j];
      // ${bkDate}
      td.classList.add("hoverable");
      td.setAttribute("onmouseover", `show(event, 'Booking Date: ${bkDate}')`);
      td.setAttribute("onmouseout", "hide()");   //() call 
    }
  }
}

const renderRows = (data) => {
  let table = document.querySelector('tbody')
  for (let i = 0; i < data.length; i++) {
    let rowI = table.insertRow(i)
    rowI.setAttribute("Name", "row")

    let cell0 = rowI.insertCell(0)
    cell0.innerHTML = data[i].PassengerName

    let cell1 = rowI.insertCell(1)
    cell1.innerHTML = data[i].FlightNo

    let cell2 = rowI.insertCell(2)
    cell2.innerHTML = data[i].Airline

    let cell3 = rowI.insertCell(3)
    cell3.innerHTML = data[i].Origin

    if (data[i].Via == undefined) {
      let cell4 = rowI.insertCell(4)
      cell4.innerHTML = "----"
    }
    else {
      let cell4 = rowI.insertCell(4)
      cell4.innerHTML = data[i].Via
    }


    let cell5 = rowI.insertCell(5)
    cell5.innerHTML = data[i].Destination

    let depDT = new Date(data[i].DepDT)
    let cell6 = rowI.insertCell(6)
    cell6.innerHTML = `${depDT.getDate()}/${depDT.getMonth() + 1}/${depDT.getFullYear()}`

    console.log(depDT.toLocaleTimeString([], { timeStyle: 'short' }))
    let cell7 = rowI.insertCell(7)
    cell7.innerHTML = depDT.toLocaleTimeString([], { timeStyle: 'short' })
    console.log(data[i].ArvDT)
    if (data[i].ArvDT == undefined) {
      let cell8 = rowI.insertCell(8)
      cell8.innerHTML = "-----"
      let cell9 = rowI.insertCell(9)
      cell9.innerHTML = "-----"
    }
    else {
      let arvDT = new Date(data[i].ArvDT)
      let cell8 = rowI.insertCell(8)
      cell8.innerHTML = `${arvDT.getDate()}/${arvDT.getMonth() + 1}/${arvDT.getFullYear()}`

      let cell9 = rowI.insertCell(9)
      cell9.innerHTML = arvDT.toLocaleTimeString([], { timeStyle: 'short' })
    }

    let cell10 = rowI.insertCell(10)
    cell10.innerHTML = data[i].SeatNo

    let div1 = document.createElement('div')
    div1.className = "show"

    let showButton = document.createElement('button')
    showButton.innerHTML = "Show"
    showButton.onclick = () => { showTicket(data[i]) }
    div1.appendChild(showButton)

    let cell11 = rowI.insertCell(11)
    cell11.appendChild(div1)

    let div2 = document.createElement('div')
    let cancelButton = document.createElement('button')

    cancelButton.innerHTML = "Cancel"
    cancelButton.className = "red-button"
    cancelButton.onclick = () => { cancel(data[i].FlightNo, data[i].SeatNo, depDT) }
    div2.appendChild(cancelButton)

    let cell12 = rowI.insertCell(12)
    cell12.appendChild(div2)

  }
}

document.addEventListener("mousemove", position)

const showTicket = async (data) => {

  sessionStorage.setItem('data', JSON.stringify(data))
  window.location.href = "ticket.html"

}

const cancel = (flightNo, seatNo, depDT) => {

  // let DepTime = new Date(depDT); 
  let currentTime = new Date();
  let timeDiff = depDT.getTime() - currentTime.getTime();

  if (timeDiff <= 14400000) {
    console.log("Button disabled");
    alert(`Time Has Passed, You Can't Cancel Your Ticket`)
  } else {
    let url = "cancel";
    console.log("Button enabled");
    let p = fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        flightNumber: flightNo,
        seatNumber: seatNo
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    
    p.then((response) => {
      if (response.status = 200) {
        location.reload();
      }
      else {
        console.log("There is problem in server side")
      }
    })
  }


};




