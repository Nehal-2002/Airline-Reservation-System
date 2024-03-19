sessionStorage.removeItem("logoutStatus");
let dark = document.cookie
  .split("; ")
  .find((row) => row.startsWith("isDark="))
  ?.split("=")[1];

if (dark === "true") {
  var body = document.body;
  body.classList.toggle("dark-mode");
}

function fetchData() {
  let url = "listFlight";

  fetch(url, { method: "POST" })
    .then((result) => result.json())
    .then((data) => {
      console.log("Successfully retrieved flight data from server");
      console.log(data);

      const currentDate = new Date();

      data.forEach((flight) => {
        const depDT = new Date(flight.DepDT);
        const arvDT = new Date(flight.ArvDT);

        if ((depDT < currentDate)&&(flight.Status=="ON TIME")) {
          flight.Status = "DEPARTED";

          const upd = {
            flightNumber: flight.flightNo,
            newStatus: "DEPARTED",
          };

          fetch("/updateFlightStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(upd),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result.message);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if ((arvDT < currentDate)&&(flight.Status=="DEPARTED")) {
          flight.Status = "ARRIVED";

          const upd = {
            flightNumber: flight.flightNo,
            newStatus: "ARRIVED",
          };

          fetch("/updateFlightStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(upd),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result.message);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });

      onTimeFlight(data);
      issueFlight(data);
      departedFlight(data);
      arrivedFlight(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const onTimeFlight = (data) => {
  let tbody = document.getElementById("onTimeTbody");
  let length = tbody.rows.length;
  for (let i = 0; i < length; i++) {
    tbody.deleteRow(0);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].Status == "ON TIME") {
      let rowI = tbody.insertRow(0);
      // console.log("ontimeFlight")

      let cell0 = rowI.insertCell(0);
      cell0.onclick = () => {
        sessionStorage.setItem("flightSeatData", JSON.stringify(data[i].Seats));
        window.location.href = "passengerList.html";
      };
      cell0.className = "hover-effect";
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
      cell6.innerHTML = depDT
        .toLocaleTimeString([], { timeStyle: "short" })
        .replace(" ", "&nbsp;");

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
        cell8.innerHTML = arvDT
          .toLocaleTimeString([], { timeStyle: "short" })
          .replace(" ", "&nbsp;");
      }

      let cell9 = rowI.insertCell(9);
      let cellDiv = document.createElement("div");
      cellDiv.className = "dropdown";

      let button = document.createElement("button");
      button.className = "dropbtn";
      button.innerHTML = "&#x25BE;";
      cellDiv.appendChild(button);

      let innerDiv = document.createElement("div");
      innerDiv.className = "dropdown-content";
      cellDiv.appendChild(innerDiv);

      cell9.appendChild(cellDiv);

      let inputField = document.createElement("input");
      inputField.setAttribute("type", "text");
      inputField.classList.add("input-field");
      inputField.placeholder = "Enter Time";

      let submitButton = document.createElement("button");
      submitButton.classList.add("submit-button");
      submitButton.onclick = () => {
        updateStatusForIssue(data[i].flightNo, "onTimeToissue", inputField);
      };
      submitButton.innerHTML = "Issue";

      // let departureButton = document.createElement("button");
      // departureButton.classList.add("departure-button");
      // departureButton.onclick = () => {
      //   updateStatus(data[i].flightNo, "onTimeTodeparture");
      // };
      // departureButton.innerHTML = "Departure";

      innerDiv.appendChild(inputField);
      innerDiv.appendChild(submitButton);
      // innerDiv.appendChild(departureButton);
    }
  }
};

const issueFlight = (data) => {
  let tbody = document.getElementById("issueTbody");
  let length = tbody.rows.length;
  for (let i = 0; i < length; i++) {
    tbody.deleteRow(0);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].Status == "ISSUE") {
      let rowI = tbody.insertRow(0);
      console.log("issue");
      let cell0 = rowI.insertCell(0);
      cell0.onclick = () => {
        sessionStorage.setItem("flightSeatData", JSON.stringify(data[i].Seats));
        window.location.href = "passengerList.html";
      };
      cell0.className = "hover-effect";
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
      cell6.innerHTML = depDT
        .toLocaleTimeString([], { timeStyle: "short" })
        .replace(" ", "&nbsp;");

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
        cell8.innerHTML = arvDT
          .toLocaleTimeString([], { timeStyle: "short" })
          .replace(" ", "&nbsp;");
      }

      let cell9 = rowI.insertCell(9);
      let cellDiv = document.createElement("div");
      cellDiv.className = "dropdownIssue";

      let button = document.createElement("button");
      button.className = "dropbtnIssue";
      button.innerHTML = "&#x25BE;";
      cellDiv.appendChild(button);

      let innerDiv = document.createElement("div");
      innerDiv.className = "dropdown-contentIssue";
      cellDiv.appendChild(innerDiv);

      cell9.appendChild(cellDiv);

      let departureButtonIssue = document.createElement("button");
      departureButtonIssue.classList.add("departure-buttonIssue");
      departureButtonIssue.onclick = () => {
        updateStatus(data[i].flightNo, "issueToOntime");
      };
      departureButtonIssue.innerHTML = "Issue Solved";

      innerDiv.appendChild(departureButtonIssue);
    }
  }
};

const departedFlight = (data) => {
  let tbody = document.getElementById("departedTbody");
  let length = tbody.rows.length;
  for (let i = 0; i < length; i++) {
    tbody.deleteRow(0);
  }

  const currentDate = new Date();

  for (let i = 0; i < data.length; i++) {
    if (data[i].Status === "DEPARTED") {
      let arvDT = null;
      if (data[i].ArvDT) {
        arvDT = new Date(data[i].ArvDT);
      }

      if (!arvDT || arvDT.getTime() >= currentDate.getTime()) {
        let rowI = tbody.insertRow(0);

        let cell0 = rowI.insertCell(0);
        cell0.onclick = () => {
          sessionStorage.setItem("flightSeatData", JSON.stringify(data[i].Seats));
          window.location.href = "passengerList.html";
        };
        cell0.className = "hover-effect";
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
        cell6.innerHTML = depDT
          .toLocaleTimeString([], { timeStyle: "short" })
          .replace(" ", "&nbsp;");

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
          cell8.innerHTML = arvDT
            .toLocaleTimeString([], { timeStyle: "short" })
            .replace(" ", "&nbsp;");
        }

        let cell9 = rowI.insertCell(9);
        let cellDiv = document.createElement("div");
        cellDiv.className = "dropdownDepartured";

        let button = document.createElement("button");
        button.className = "dropbtnDepartured";
        button.innerHTML = "&#x25BE;";
        cellDiv.appendChild(button);

        let innerDiv = document.createElement("div");
        innerDiv.className = "dropdown-contentDepartured";
        cellDiv.appendChild(innerDiv);

        cell9.appendChild(cellDiv);

        let delButton = document.createElement("button");
        delButton.classList.add("departure-buttonArrived");
        delButton.innerHTML = "Delete";
        delButton.onclick = () => {
          deleteFlight(data[i].flightNo, rowI);
        };

        innerDiv.appendChild(delButton);
      }
    }
  }
};

const arrivedFlight = (data) => {
  let tbody = document.getElementById("arrivedTbody");
  let length = tbody.rows.length;
  for (let i = 0; i < length; i++) {
    tbody.deleteRow(0);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].Status == "ARRIVED") {
      let rowI = tbody.insertRow(0);

      let cell0 = rowI.insertCell(0);
      cell0.onclick = () => {
        sessionStorage.setItem("flightSeatData", JSON.stringify(data[i].Seats));
        window.location.href = "passengerList.html";
      };
      cell0.className = "hover-effect";
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
      cell6.innerHTML = depDT
        .toLocaleTimeString([], { timeStyle: "short" })
        .replace(" ", "&nbsp;");

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
        cell8.innerHTML = arvDT
          .toLocaleTimeString([], { timeStyle: "short" })
          .replace(" ", "&nbsp;");
      }

      let cell9 = rowI.insertCell(9);
      let cellDiv = document.createElement("div");
      cellDiv.className = "dropdownArrived";

      let button = document.createElement("button");
      button.className = "dropbtnArrived";
      button.innerHTML = "&#x25BE;";
      cellDiv.appendChild(button);

      let innerDiv = document.createElement("div");
      innerDiv.className = "dropdown-contentArrived";
      cellDiv.appendChild(innerDiv);

      cell9.appendChild(cellDiv);

      let delButton = document.createElement("button");
      delButton.classList.add("departure-buttonArrived");
      delButton.innerHTML = "Delete";
      delButton.onclick = () => {
        deleteFlight(data[i].flightNo, rowI);
      };

      innerDiv.appendChild(delButton);
    }
  }
};

function deleteFlight(flightNumber, row) {
  fetch(`/deleteFlight/${flightNumber}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message); 
      if (data.success) {
        row.parentNode.removeChild(row);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateStatus = (flightNum, status) => {
  if (status == "onTimeTodeparture") {
    let url = "changeStatus";
    let p = fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status, flightNumber: flightNum }),
    });

    p.then((response) => {
      return response.json();
    })
      .then((data) => {
        console.log("successfully retrieved data from served");
        onTimeFlight(data);
        departedFlight(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (status == "departedToArrived") {
    let url = "changeStatus";
    let p = fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status, flightNumber: flightNum }),
    });

    p.then((response) => {
      return response.json();
    })
      .then((data) => {
        console.log("successfully retrieved data from served");
        departedFlight(data);
        arrivedFlight(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (status == "arriveToOnTime") {
    let url = "changeStatus";
    let p = fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status, flightNumber: flightNum }),
    });

    p.then((response) => {
      return response.json();
    })
      .then((data) => {
        console.log("successfully retrieved data from served");
        arrivedFlight(data);
        onTimeFlight(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (status == "issueToOntime") {
    let url = "changeStatus";
    let p = fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status, flightNumber: flightNum }),
    });

    p.then((response) => {
      return response.json();
    })
      .then((data) => {
        console.log("successfully retrieved data from served");
        issueFlight(data);
        onTimeFlight(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  UpdateTable();
};

const updateStatusForIssue = (flightNo, status, inpEle) => {
  let issueTime = inpEle.value;
  if (issueTime.length == 0) {
    alert("Please enter time");
  } else {
    let url = "changeStatus";
    let p = fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: status,
        flightNumber: flightNo,
        NewTime: issueTime,
      }),
    });

    p.then((response) => {
      return response.json();
    })
      .then((data) => {
        issueFlight(data);
        onTimeFlight(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  UpdateTable();
};

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

function UpdateTable() {
  location.reload();
}

function updateDateTime() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  document.getElementById("currentDateTime").textContent = formattedDate;
}
setInterval(updateDateTime, 1000);
updateDateTime();
