// Inserting new document to db
const insertData = () => {
    let newAirline = document.getElementById('airlineName').value

    if (typeof newAirline == "string" && newAirline.trim().length === 0) {
        console.log('Please enter airline name')
        return
    }
    else {
        let data = { Name: newAirline };
        let url = 'updateListAirline';
        let p = fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        p.then((response) => {
            return response.json()
        })
            .then((data) => {
                deleteRows()
                renderRows(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// Deleting a document from db
const deleteData = (rowButton) => {
    // console.log(rowButton.cells[1].innerHTML)
    let airlineName = rowButton.cells[1].innerHTML
    let url = `listAirline/${airlineName}`
    let p = fetch(url, {
        method: 'DELETE'
    })

    p.then((result) => {
        return result.json();
    })
        .then((data) => {
            console.log(`Deleted ${airlineName} and get data successfully from db`)
            deleteRows()
            fetchData()
        })
}

// Fetching data from airline db
const fetchData = () => {
    let url = "getListAirline";
    let p = fetch(url,{method:'POST'});
    p.then((result) => {
        return result.json();
    })
        .then((data) => {
            console.log("Fetech data from airline collection successfully")
            renderRows(data)
        })
}

// Delete rows in airline table
const deleteRows = () => {
    let rows = document.querySelector('tbody').rows.length
    for (let i = 0; i < rows; i++) {
        document.querySelector('tbody').deleteRow(0)
    }
}

// Inserting rows in airline table
function renderRows(data) {
    console.log(data)
    let table = document.querySelector('tbody')
    for (let i = 0; i < data.length; i++) {

        let rowI = table.insertRow(i)

        let cell1 = rowI.insertCell(0)
        cell1.innerHTML = i + 1

        let cell2 = rowI.insertCell(1)
        cell2.innerHTML = data[i].Name

        let cell3 = rowI.insertCell(2)

        let btnDiv = document.createElement('div')
        btnDiv.className = 'btn'
        btnDiv.innerHTML = `<input type="button" class="button" value="ᴅᴇʟ">`
        btnDiv.addEventListener('click', (e) => { deleteData(rowI) })
        cell3.appendChild(btnDiv)

    }
}

let dark = document.cookie
.split("; ")
.find((row) => row.startsWith("isDark="))
?.split("=")[1]
if(dark == 'true')
{
    var body = document.body;
    body.classList.toggle("dark-mode");
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
