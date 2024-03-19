const mongoose = require('mongoose')

mongoose.connect("Enter path", { useNewUrlParser: true, useUnifiedTopology: true })

let historySchema = new mongoose.Schema({
    PassengerName : String,
    FlightNo : String,
    Airline : String,
    Origin : String,
    Via : String,
    Destination : String,
    DepDT : Date,
    ArvDT : Date,
    SeatNo : String,
    BookingDate : String
})

let passengerSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    Password : String,
    History : [historySchema]
})

let Passenger = mongoose.model('Passenger',passengerSchema)

let airlineSchema = new mongoose.Schema({
    Name: String
})

let Airline = mongoose.model('Airline', airlineSchema)

let seatSchema = mongoose.Schema({
    seatNo : String,
    Class : String,
    Price : Number,
    PassengerName : String,
    PassengerMNumber : String,
    PassengerDOB : String
})

let flightSchema = new mongoose.Schema({
    // Departure and arrival date and time
    flightNo : String,
    DepDT : Date,
    ArvDT : Date,
    Origin : String,
    Via : String,
    Destination : String,
    Duration : Number,
    Airline : String,
    Status : String,
    Seats : [seatSchema]
})

let Flight = mongoose.model('Flight',flightSchema)

let querySchema = new mongoose.Schema({
    Name : String,
    Email : String,
    Query : String
})

let Query = mongoose.model('Query',querySchema)
module.exports = {Passenger, Airline,Flight,Query}