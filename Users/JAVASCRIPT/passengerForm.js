let userName = document.cookie
.split("; ")
.find((row) => row.startsWith("userName="))
?.split("=")[1]
let decodedName = decodeURIComponent(userName)
let modifiedName = decodedName.replaceAll(" ","&nbsp")
let userNameDiv = document.getElementById('userName')
userNameDiv.innerHTML = modifiedName

let infoObj = JSON.parse(sessionStorage.getItem('filterObj'))
let seat = sessionStorage.getItem('seatNumber').split(',')
let TNOS = parseInt(sessionStorage.getItem('TNOS'))
let count = 0
// let passenger = JSON.parse(sessionStorage.getItem('pInfo'))
var passengerArray = {
    Name: [],
    Mnumber: [],
    DOB: []
}
// if(passenger == null)
// {
//     passengerArray = {
//         
//     }
// }
if (count == (TNOS - 1)) {
    document.getElementById('spanSubmit').innerHTML = "Proceed to payment"
}
document.addEventListener("DOMContentLoaded", function () {
    var Input = document.getElementById("validationDefault03");
    

    Input.addEventListener("focus", function () {
        if (Input.value !== "+91 ") {
            Input.value = "+91 ";
        }
    });
});

const submit = (event) => {
    //   event.preventDefault();
    let fName = document.getElementById('validationDefault01').value.trim()
    let mName = document.getElementById('validationDefault02').value.trim()
    let lName = document.getElementById('validationDefaultUsername').value.trim()
    let mNumber = document.getElementById('validationDefault03').value
    let DOB = document.getElementById('validationDefault05').value
    let TC = document.getElementById('invalidCheck2').checked

    if (count < TNOS) {
        if (fName != '' && lName != '' && mNumber.length == 14 && DOB != '' && TC !='') {
            storeData(fName, mName, lName, mNumber, DOB);
            document.getElementById('validationDefault01').value = ""
            document.getElementById('validationDefault02').value = ""
            document.getElementById('validationDefaultUsername').value = ""
            document.getElementById('validationDefault03').value = ""
            document.getElementById('validationDefault05').value = ""
            document.getElementById('invalidCheck2').checked = false;
        }
        else {
            alert('Please give Name, mobile number and DOB and Agree T&C')
        }
    }

    if (count == (TNOS - 1)) {
        document.getElementById('spanSubmit').innerHTML = "Proceed to payment"
    }
    else if (count == TNOS) {
        sendData()
    }
}

const storeData = (fName, mName, lName, mNumber, DOB) => {
    console.log("Working")
    if (count < TNOS) {

        count++

        if (mName != "") {
            userName = `${fName} ${mName} ${lName}`
        }
        else if (mName == "") {
            userName = `${fName} ${lName}`
        }

        passengerArray.Name.push(userName)
        passengerArray.Mnumber.push(mNumber)
        let date = new Date(DOB)
        passengerArray.DOB.push(date.toLocaleDateString())
        console.log(passengerArray)

    }
}

const sendData = () => {
    sessionStorage.setItem('passengerInfo',JSON.stringify(passengerArray))
    window.location.href = "payment.html"
}

function toggleDropdown() {
        var dropdownContent = document.getElementById("dropdown-content");
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }