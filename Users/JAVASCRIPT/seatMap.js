// For booked seat and make it disable
var seatCount = 0
var filterObj = JSON.parse(sessionStorage.getItem('filterObj'))
var TNOS = parseInt(filterObj.adultNumber) + parseInt(filterObj.childNumber)
let seatNumbers = []
let flightData = JSON.parse(sessionStorage.getItem('flightData'))
// let url = `seatMap/${flightData.flightNo}`
// console.log(flightData[0].Price)

// let result = fetch(url)
// result
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
        
    // })
    // .catch((err) => {
    //     alert(err)
    // })

const bookStatusSeats = (seatArray) => {
    let firstClass = document.getElementsByClassName('firstClass');
    console.log("In bookStatusSeats")
    for (let i = 0; i < 30; i++) {
        if (seatArray[i].PassengerName == null) {
            firstClass[i].setAttribute('id', `F${i + 1}`)
            firstClass[i].style.backgroundColor = "aqua"

        }
        else if (seatArray[i].PassengerName != null) {
            firstClass[i].style.backgroundColor = 'lightgrey'
        }
    }

    let businessClass = document.getElementsByClassName('businessClass');

    for (let i = 30; i < 60; i++) {
        if (seatArray[i].PassengerName == null) {
            businessClass[i - 30].setAttribute('id', `B${(i - 30) + 1}`)
            businessClass[i - 30].style.backgroundColor = "gold"
        }
        else if (seatArray[i].PassengerName != null) {
            businessClass[i - 30].style.backgroundColor = 'lightgrey'
        }
    }

    let economyClass = document.getElementsByClassName('economyClass');

    for (let i = 60; i < 180; i++) {
        if (seatArray[i].PassengerName == null) {
            economyClass[i - 60].setAttribute('id', `E${(i - 60) + 1}`)
            economyClass[i - 60].style.backgroundColor = "lightgreen"
        }
        else if (seatArray[i].PassengerName != null) {
            economyClass[i - 60].style.backgroundColor = 'lightgrey'
        }
    }
}

// For Seat color change and toggle
const seatSelect = () => {
    const firstClass = document.getElementsByClassName('firstClass');
    const businessClass = document.getElementsByClassName('businessClass');
    const economyClass = document.getElementsByClassName('economyClass');
    const flightClass = filterObj.flightClass
    alert(`You can only select ${TNOS} seats for ${flightClass}`)

    if (flightClass == 'First class') {
        for (let i = 0; i < firstClass.length; i++) {
            if (firstClass[i].style.backgroundColor != 'grey') {
                firstClass[i].addEventListener('click', () => {
                    let id = firstClass[i].getAttribute('id')
                    if ((firstClass[i].style.backgroundColor == 'aqua') && ((seatCount <= TNOS))) {
                        if (seatCount == TNOS) {
                            alert(`You have already selected ${TNOS} seats`)
                        }
                        else {
                            seatNumbers.push(id)
                            console.log(seatNumbers)
                            seatCount++
                            firstClass[i].style.backgroundColor = 'rgb(247, 131, 131)';
                            console.log(`${seatCount} ${TNOS}`)
                        }
                    } else if ((firstClass[i].style.backgroundColor = 'rgb(247, 131, 131)') && ((seatCount <= TNOS))) {
                        let index = seatNumbers.indexOf(id)
                        delete seatNumbers[index]
                        seatNumbers = seatNumbers.filter((str) => str !== '');
                        console.log(seatNumbers)
                        seatCount--
                        firstClass[i].style.backgroundColor = 'aqua';
                    }
                });
            }
        }
    }

    if (flightClass == 'Business class') {
        for (let i = 0; i < businessClass.length; i++) {
            businessClass[i].addEventListener('click', () => {
                let id = businessClass[i].getAttribute('id')
                if ((businessClass[i].style.backgroundColor == 'gold') && ((seatCount <= TNOS))) {
                    if (seatCount == TNOS) {
                        alert(`You have already selected ${TNOS} seats`)
                    }
                    else {
                        seatNumbers.push(id)
                        console.log(seatNumbers)
                        seatCount++
                        businessClass[i].style.backgroundColor = 'rgb(247, 131, 131)';
                    }
                } else if ((businessClass[i].style.backgroundColor = 'rgb(247, 131, 131)') && ((seatCount <= TNOS))) {
                    let index = seatNumbers.indexOf(id)
                    delete seatNumbers[index]
                    seatNumbers = seatNumbers.filter((str) => str !== '');
                    console.log(seatNumbers)
                    seatCount--
                    businessClass[i].style.backgroundColor = 'gold';
                }
            });
        }
    }

    if (flightClass == 'Economy class') {
        for (let i = 0; i < economyClass.length; i++) {
            economyClass[i].addEventListener('click', () => {

                let id = economyClass[i].getAttribute('id')
                if ((economyClass[i].style.backgroundColor == 'lightgreen') && ((seatCount <= TNOS))) {
                    if (seatCount == TNOS) {
                        alert(`You have already selected ${TNOS} seats`)
                    }
                    else {
                        seatNumbers.push(id)
                        console.log(seatNumbers)
                        seatCount++
                        economyClass[i].style.backgroundColor = 'rgb(247, 131, 131)';
                    }
                } else if ((economyClass[i].style.backgroundColor = 'rgb(247, 131, 131)') && ((seatCount <= TNOS))) {
                    let index = seatNumbers.indexOf(id)
                    delete seatNumbers[index]
                    seatNumbers = seatNumbers.filter((str) => str !== '');
                    console.log(seatNumbers)
                    seatCount--
                    economyClass[i].style.backgroundColor = 'lightgreen';
                }
            });
        }
    }

}
// for firstClass hover Popup Window
function createPopup() {
    const popupElement = document.createElement('div');
    popupElement.className = 'popup';

    const cornerInfoElement = document.createElement('div');
    cornerInfoElement.className = 'corner-info';

    const seatInfoElement = document.createElement('p');
    seatInfoElement.className = 'seat-info';
    seatInfoElement.innerHTML = 'On-demand TV <br>and AC Power';

    const priceElement = document.createElement('p');
    priceElement.className = 'price';                 //price added
    priceElement.innerHTML = `Price: ₹${flightData.Seats[0].Price}`;

    const additionalInfoElement = document.createElement('p');
    additionalInfoElement.className = 'additional-info';
    additionalInfoElement.innerHTML =
        'This is a standard First Class seat located at the bulkhead. The tray table is in the armrest, making the armrest immovable and slightly reducing seat width. There is no floor storage for this seat during take-off or landing.';

    cornerInfoElement.appendChild(seatInfoElement);
    cornerInfoElement.appendChild(priceElement);
    popupElement.appendChild(cornerInfoElement);
    popupElement.appendChild(additionalInfoElement);

    // Add the popup to each firstClass element
    const firstClassSeats = document.getElementsByClassName('firstClass');
    Array.from(firstClassSeats).forEach((seat, index) => {
        const headingElement = document.createElement('h3');
        const seatNumber = (index + 1).toString().padStart(2, '0');
        headingElement.innerHTML = `Seat ${seatNumber} <br>First Class`;

        const clonedPopupElement = popupElement.cloneNode(true);
        clonedPopupElement.insertBefore(headingElement, clonedPopupElement.firstChild);

        seat.appendChild(clonedPopupElement);
    });
}

// for businessClass hover Popup Window
function createPopupB() {
    const popupElement = document.createElement('div');
    popupElement.className = 'popup';

    const cornerInfoElement = document.createElement('div');
    cornerInfoElement.className = 'corner-info';

    const seatInfoElement = document.createElement('p');
    seatInfoElement.className = 'seat-info';
    seatInfoElement.innerHTML = 'On-demand TV <br>and AC Power';

    const priceElement = document.createElement('p');
    priceElement.className = 'price';                 //price added
    priceElement.innerHTML = `Price: ₹${flightData.Seats[30].Price}`;

    const additionalInfoElement = document.createElement('p');
    additionalInfoElement.className = 'additional-info';
    additionalInfoElement.innerHTML = `This is a standard Business Class seat located at the bulkhead. The tray table is in the armrest, making the armrest immovable and slightly reducing seat width. There is no floor storage for this seat during take-off or landing.`;

    cornerInfoElement.appendChild(seatInfoElement);
    cornerInfoElement.appendChild(priceElement);
    popupElement.appendChild(cornerInfoElement);
    popupElement.appendChild(additionalInfoElement);

    // Add the popup to each businessClass element
    const businessClassSeats = document.getElementsByClassName('businessClass');
    Array.from(businessClassSeats).forEach((seat, index) => {
        const headingElement = document.createElement('h3');
        const seatNumber = (index + 1).toString().padStart(2, '0');
        headingElement.innerHTML = `Seat ${seatNumber} <br>Business Class`;

        const clonedPopupElement = popupElement.cloneNode(true);
        clonedPopupElement.insertBefore(headingElement, clonedPopupElement.firstChild);

        seat.appendChild(clonedPopupElement);
    });
}

// for economyClass hover Popup Window
function createPopupE() {
    const popupElement = document.createElement('div');
    popupElement.className = 'popup';

    const cornerInfoElement = document.createElement('div');
    cornerInfoElement.className = 'corner-info';

    const seatInfoElement = document.createElement('p');
    seatInfoElement.className = 'seat-info';
    seatInfoElement.innerHTML = 'On-demand TV <br>No AC Power';

    const priceElement = document.createElement('p');
    priceElement.className = 'price';                 //price added
    priceElement.innerHTML = `Price: ₹${flightData.Seats[60].Price}`;

    const additionalInfoElement = document.createElement('p');
    additionalInfoElement.className = 'additional-info';
    additionalInfoElement.innerHTML =
        'This is a standard EconomyClass Class seat located at the bulkhead. The tray table is in the armrest, making the armrest immovable and slightly reducing seat width. There is no floor storage for this seat during take-off or landing.';

    cornerInfoElement.appendChild(seatInfoElement);
    cornerInfoElement.appendChild(priceElement);
    popupElement.appendChild(cornerInfoElement);
    popupElement.appendChild(additionalInfoElement);

    // Add the popup to each economyClass element
    const economyClassSeats = document.getElementsByClassName('economyClass');
    Array.from(economyClassSeats).forEach((seat, index) => {
        const headingElement = document.createElement('h3');
        const seatNumber = (index + 1).toString().padStart(2, '0');
        headingElement.innerHTML = `Seat ${seatNumber} <br>Economy Class`;

        const clonedPopupElement = popupElement.cloneNode(true);
        clonedPopupElement.insertBefore(headingElement, clonedPopupElement.firstChild);

        seat.appendChild(clonedPopupElement);
    });
}

bookStatusSeats(flightData.Seats)
seatSelect()

createPopup();
createPopupB();
createPopupE();

let submitButton = document.getElementById('submit')
submitButton.addEventListener('click', (e) => {
    if (seatCount != TNOS) {
        alert(`Please select ${TNOS} seat from ${filterObj.flightClass}`)
        e.preventDefault()
        return
    }
    else {
        let d = new Date()
        let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        sessionStorage.setItem('bookingDate',date)
        sessionStorage.setItem('seatNumber', seatNumbers)
        sessionStorage.setItem('TNOS',TNOS)
        // Store seat ids in session storage
        window.location.href = "passengerForm.html"
    }

})

document.getElementById('fno').innerHTML = 'Flight No: ' + flightData.flightNo;


