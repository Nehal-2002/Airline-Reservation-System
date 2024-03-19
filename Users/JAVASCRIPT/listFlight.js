let userName = document.cookie
  .split("; ")
  .find((row) => row.startsWith("userName="))
  ?.split("=")[1];
let decodedName = decodeURIComponent(userName);
let modifiedName = decodedName.replaceAll(" ", "&nbsp");
let userNameDiv = document.getElementById("userName");
userNameDiv.innerHTML = modifiedName;

const fetchData = () => {
  let url = "listFlight";
  let p = fetch(url, {
    method: "POST",
  });
  p.then((response) => {
    return response.json();
  })
    .then((data) => {
      console.log("Fetch data successfully");
      renderRows(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderRows = (data) => {
  let table = document.querySelector("tbody");
  let currentDate = new Date();

  for (let i = 0; i < data.length; i++) {
    let rowI = table.insertRow(1);

    let cell0 = rowI.insertCell(0);
    cell0.innerHTML = data[i].flightNo;

    let cell1 = rowI.insertCell(1);
    cell1.innerHTML = data[i].Airline;

    let cell2 = rowI.insertCell(2);
    cell2.innerHTML = data[i].Origin;

    let cell3 = rowI.insertCell(3);
    cell3.innerHTML = data[i].Via;

    let cell4 = rowI.insertCell(4);
    cell4.innerHTML = data[i].Destination;

    let depDT = new Date(data[i].DepDT);
    let cell5 = rowI.insertCell(5);
    cell5.innerHTML = `${depDT.getDate()}/${
      depDT.getMonth() + 1
    }/${depDT.getFullYear()}`;

    let cell6 = rowI.insertCell(6);
    cell6.innerHTML = depDT.toLocaleTimeString([], { timeStyle: "short" });

    if (data[i].ArvDT == undefined) {
      let cell7 = rowI.insertCell(7);
      cell7.innerHTML = "-----";
      let cell8 = rowI.insertCell(8);
      cell8.innerHTML = "-----";
    } else {
      let arvDT = new Date(data[i].ArvDT);
      let cell7 = rowI.insertCell(7);
      cell7.innerHTML = `${arvDT.getDate()}/${
        arvDT.getMonth() + 1
      }/${arvDT.getFullYear()}`;

      let cell8 = rowI.insertCell(8);
      cell8.innerHTML = arvDT.toLocaleTimeString([], { timeStyle: "short" });
    }

    let cell9 = rowI.insertCell(9);
    if (data[i].ArvDT === undefined && depDT <= currentDate) {
      cell9.innerHTML = "DEPARTED";
    } else if (data[i].ArvDT !== undefined) {
      let arvDT = new Date(data[i].ArvDT);
      if (arvDT <= currentDate) {
        cell9.innerHTML = "ARRIVED";
      } else if (depDT <= currentDate) {
        cell9.innerHTML = "DEPARTED";
      } else {
        cell9.innerHTML = data[i].Status;
      }
    } else {
      cell9.innerHTML = data[i].Status;
    }
  }
};

const sending = (flightNo) => {
  window.location.href = `passengerList/${flightNo}`;
};
