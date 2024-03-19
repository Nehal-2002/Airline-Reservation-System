const mongoose = require('mongoose')

mongoose.connect("Enter path", { useNewUrlParser: true, useUnifiedTopology: true })

let adminSchema = new mongoose.Schema({
    _id: { type: Number },
    Email: { type: String },
    Password: { type: String }
})

let Admin = mongoose.model('Admin', adminSchema)

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
    /* <th>SL No.</th>
    <th>Seat No.</th>
    <th>Name</th>
    <th>Contact Info</th>
    <th>D.O.B</th>
    <th>Class</th>
    <th>Amount</th>*/
})

let flightSchema = new mongoose.Schema({
    // Departure and arrival date and time
    flightNo : String,
    DepDT : Date,
    ArvDT : {
        type: Date,
        required : false
    },
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
module.exports = {Admin,Airline,Flight,Query}