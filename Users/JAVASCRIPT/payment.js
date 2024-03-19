let filterObj = JSON.parse(sessionStorage.getItem('filterObj'))
flightClass = filterObj.flightClass
let flightData = JSON.parse(sessionStorage.getItem('flightData'))
let price
if (flightClass == 'First class') {
    price = parseInt(flightData.Seats[0].Price)
}
else if (flightClass == 'Business class') {
    price = parseInt(flightData.Seats[32].Price)
}
else if (flightClass == 'Economy class') {
    price = parseInt(flightData.Seats[62].Price)
}
else {
    alert('Cannot get price')
}

let totalSeats = parseInt(sessionStorage.getItem('TNOS'))
let totalCost = (totalSeats * price)

document.getElementById('cost').innerHTML = totalCost

let userName = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userName="))
    ?.split("=")[1]
let decodedName = decodeURIComponent(userName)
let modifiedName = decodedName.replaceAll(" ", "&nbsp")
let userNameDiv = document.getElementById('userName')
userNameDiv.innerHTML = modifiedName
document.getElementById('userName').innerHTML = modifiedName
document.getElementById('flightClass').innerHTML = flightClass
document.getElementById('totalSeats').innerHTML = `No. Of Seat: ${totalSeats}`
document.getElementById('seatPrice').innerHTML = `₹${price} (50% discount)`


const check = () => {
    let cardNumber = document.getElementById('cardNumber').value
    let name = document.getElementById('name').value
    let cvv = document.getElementById('cvv').value

    if ((cardNumber.length == 14) && (name.trim().length != 0) && (cvv.length == 3)) {
        sendData()
    }
    else {
        alert('Please give card number, user name and cvv')
    }
}

const sendData = () => {
    let BKDate = sessionStorage.getItem('bookingDate')
    let passengerArray = JSON.parse(sessionStorage.getItem('passengerInfo'))
    let fData = JSON.parse(sessionStorage.getItem('flightData'))
    let sNumber = sessionStorage.getItem('seatNumber')
    let TNOS = sessionStorage.getItem('TNOS')
    let url = "update"
    let result = fetch(url, {
        method: "POST",
        body: JSON.stringify({
            bookingDate: BKDate,
            seatNumber: sNumber,
            totalSeats: TNOS,
            passengerInfo: passengerArray,
            flightData: fData
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    console.log("Sending....")
    result.then((response) => {
        sessionStorage.removeItem('bookingDate')
        sessionStorage.removeItem('passengerInfo')
        sessionStorage.removeItem('filterObj')
        sessionStorage.removeItem('flightData')
        sessionStorage.removeItem('seatNumber')
        sessionStorage.removeItem('TNOS')
        window.location.href = "bookingHistory.html"
    })
        .catch((err) => {
            console.log(err)
        })
}