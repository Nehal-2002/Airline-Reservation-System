let data = JSON.parse(sessionStorage.getItem('data'))

let origin = document.getElementsByName('origin')
origin[0].innerHTML = data.Origin.substr(0,3)
origin[1].innerHTML = data.Origin.substr(0,3)

let via  = document.getElementsByClassName('via')
via[0].innerHTML = data.Via.substr(0,3)
via[1].innerHTML = data.Via.substr(0,3)

let dest  = document.getElementsByName('dest')
dest[0].innerHTML = data.Destination.substr(0,3)
dest[1].innerHTML = data.Destination.substr(0,3)

let userName  = document.getElementsByName('name')
userName[0].innerHTML = data.PassengerName
userName[1].innerHTML = data.PassengerName

let flightNo = document.getElementsByName('flightNo')
flightNo[0].innerHTML = data.FlightNo
flightNo[1].innerHTML = data.FlightNo

let airline = document.getElementById('airline')
airline.innerHTML = data.Airline

let seatNo = document.getElementsByName('seatNo')
seatNo[0].innerHTML = data.SeatNo
seatNo[1].innerHTML = data.SeatNo

let depDT = document.getElementById('depDT')
let dep = new Date(data.DepDT)
let depDate = `${dep.getDate()}/${dep.getMonth()+1}/${dep.getFullYear()}`  
dep.setHours(dep.getHours() - 1);
let depTime = dep.toLocaleTimeString([], { timeStyle: 'short' });
depDT.innerHTML = `${depTime} ${depDate}`

let arvDT = document.getElementById('arvDT')
if(data.ArvDT == undefined)
{
    arvDT.innerHTML = 'XX  XX/XX/XXXX'
}
else{
    let arv = new Date(data.ArvDT)
    let arvDate = `${arv.getDate()}/${arv.getMonth()+1}/${arv.getFullYear()}`
    let arvTime = arv.toLocaleTimeString([], { timeStyle: 'short' })
    arvDT.innerHTML = `${arvTime} ${arvDate}`
}