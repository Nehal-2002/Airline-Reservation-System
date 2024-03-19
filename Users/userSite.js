const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { Passenger, Airline, Flight, Query } = require("./dbConnect");
const app = express();
const port = 5600;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//--------------------- Render all html files ----------------------
// Landing page or home page for both user
app.get("/", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "HTML", "home.html");
    res.sendFile(Path);
  }
});

app.get("/home.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "HTML", "home.html");
    res.sendFile(Path);
  }
});

// All middleware for sending user html is here

app.get("/userLogin.html", (req, res) => {
  res.clearCookie("id");
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "HTML", "\\userLogin.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  }
});

app.get("/userSignup.html", (req, res) => {
  res.clearCookie("id");
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "HTML", "\\userSignup.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  }
});

app.get("/userPanel.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) //undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\userPanel.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/listFlight.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\listFlight.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});
app.get("/filterListFlight.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\filterListFlight.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/seatMap.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\seatMap.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/passengerForm.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\passengerForm.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/bookingHistory.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\bookingHistory.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/payment.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\payment.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/ticket.html", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "\\ticket.html");
    res
      .set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      })
      .sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/error.html", (req, res) => {
  var Path = path.join(__dirname, "HTML", "error.html");
  res.status(400).sendFile(Path);
});

app.get("/id.html", (req, res) => {
  let check = req.cookies.id;
  if (check != undefined) {
    var Path = path.join(__dirname, "HTML", "\\id.html");
    res.sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});

app.get("/contactUs.html", (req, res) => {
  let check = req.cookies.loginStatus;
  if (check != undefined) {
    var Path = path.join(__dirname, "HTML", "\\contactUs.html");
    res.sendFile(Path);
  } else {
    res.redirect("/userLogin.html");
  }
});
// -------------Rendering all css files---------------------

app.get("/home.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "CSS", "home.css");
    res.sendFile(Path);
  }
});

app.get("/bootstrap.min_booking.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\bootstrap.min_booking.css");
    res.sendFile(Path);
  } else {
    var Path = path.join(__dirname, "HTML", "\\error.html");
    res.sendFile(Path);
  }
});

app.get("/listFlight.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "listFlight.css");
    res.sendFile(Path);
  } else {
    var Path = path.join(__dirname, "HTML", "\\error.html");
    res.sendFile(Path);
  }
});

app.get("/userLogin.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "CSS", "\\userLogin.css");
    res.sendFile(Path);
  }
});

app.get("/userSignup.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    var Path = path.join(__dirname, "CSS", "\\userSignup.css");
    res.sendFile(Path);
  }
});

app.get("/userPanel.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\userPanel.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/seatMap.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "seatMap.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/passengerForm.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\passengerForm.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/bookingHistory.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\bookingHistory.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/payment.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\payment.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/ticket.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\ticket.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/contactUs.css", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "\\contactUs.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/id.css", (req, res) => {
  var Path = path.join(__dirname, "CSS", "\\id.css");
  res.sendFile(Path);
});

//------------------ Rendering all images files here -----------------
app.get("/beach.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "\beach.jpg");
  res.sendFile(Path);
});

app.get("/forest.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "\\forest.jpg");
  res.sendFile(Path);
});

app.get("/gurudwara.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "gurudwara.jpg");
  res.sendFile(Path);
});

app.get("/iceland.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "iceland.jpg");
  res.sendFile(Path);
});

app.get("/city1.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "city1.jpg");
  res.sendFile(Path);
});

app.get("/city2.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "city2.jpg");
  res.sendFile(Path);
});

app.get("/tajmahal.jpg", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "\\tajmahal.jpg");
  res.sendFile(Path);
});

app.get("/logo.png", (req, res) => {
  var Path = path.join(__dirname, "IMAGES", "logo.png");
  res.sendFile(Path);
});

// Render all client side js files

app.get("/userSignup.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/userPanel.html");
  } else {
    let Path = path.join(__dirname, "JAVASCRIPT", "\\userSignup.js");
    res.sendFile(Path);
  }
});

app.get("/userPanel.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    let Path = path.join(__dirname, "JAVASCRIPT", "\\userPanel.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/listFlight.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\listFlight.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/filterListFlight.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\filterListFlight.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/seatMap.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\seatMap.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/passengerForm.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\passengerForm.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/bookingHistory.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\bookingHistory.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/payment.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\payment.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/ticket.js", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "\\ticket.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.post("/signup", async (req, res) => {
  let userName = req.body.Name;
  let email = req.body.Email;
  let pass = req.body.Password;

  let response = Passenger.find({ Email: email });
  // let status = false

  let status = await response
    .then((result) => {
      if (result.length != 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(status);
  if (status == true) {
    userName = userName.replace(/ /g, " "); //userName = userName.replace(/ /g, '&nbsp;');
    let docObj = new Passenger({
      Name: userName,
      Email: email,
      Password: pass /*Going to work here.......*/,
    });
    let result = docObj.save();

    result
      .then((data) => {
        console.log("Successfully registered");
        // sessionStorage.setItem('id','${data.id}')
        // res.send(`<script>
        // window.location.href = "id.html"
        // </script>`)
        res.cookie("id", data.id, {
          expires: new Date(Date.now() + 30 * 24 * 3600000),
        });
        res.redirect("/id.html");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Error in registered");
    res.send(`<script>
            alert("Email is already registered")
            window.location.href = "userSignup.html"
            </script>`);
  }
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  let queryResult = Passenger.find({ Email: email });
  let result = await queryResult.then((data) => {
    if (data.length == 0) {
      return "Not registered";
    } else {
      if (data[0].Password == pass) {
        return data[0].Name;
      } else {
        return "Incorrect Password";
      }
    }
  });

  if (result == "Not registered") {
    res.send(`<script>
        alert('Register first')
        window.location.replace("userLogin.html")
        </script>`);
  } else if (result == "Incorrect Password") {
    res.send(`<script>
        alert('Incorrect Password')
        window.location.replace("userLogin.html")
        </script>`);
  } else {
    res.cookie("loginStatus", true, {
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
    res.cookie("userName", result, {
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
    res.cookie("userEmail", email, {
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
    res.redirect("/userPanel.html");
    console.log(`user logged in successfully. Email : ${email}`);
  }
});

app.post("/forgotPassword", async (req, res) => {
  let id = req.body.userId;
  let pass = req.body.Password;
  console.log(id + " " + pass);
  try {
    const search = await Passenger.find({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (search.length == 0) {
      res.json({ Message: "Register first" });
    } else {
      console.log(search);

      const result = await Passenger.updateOne(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          $set: {
            Password: pass,
          },
        }
      );
      console.log(result);
      if (result.modifiedCount == 0) {
        console.log("Same pass");
        res.json({ Message: "Please try another password" });
      } else {
        console.log("Changed pass");
        res.json({ Message: "Successfully changed password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ Message: "Invalid id" });
  }
});

app.post("/listFlight", (req, res) => {
  let response = Flight.find();
  response
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*app.get('/seatMap/:flightNumber', (req, res) => {

    let status = req.cookies.loginStatus
    // console.log(status) undefined or string
    if (status == "true") {
        let flightNumber = req.params.flightNumber

        // query for fligh number then send that data to client
        let response = Flight.find({ flightNo: flightNumber })
        response.then((data) => {
            console.log(data)
            res.json(data)
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        res.redirect('/error.html')
    }
})*/

app.post("/update", async (req, res) => {
  let bookingDate = req.body.bookingDate;
  let seatNumber = req.body.seatNumber.split(",");
  let totalSeats = parseInt(req.body.totalSeats);
  let passengerDetails = req.body.passengerInfo;
  let fData = req.body.flightData;
  let email = req.cookies.userEmail;
  // console.log(fData)
  // console.log(typeof bookingDate +" "+bookingDate)
  // console.log(typeof flightNo +" "+flightNo)
  // console.log(typeof seatNumber +" "+seatNumber[0])
  // console.log(typeof totalSeats +" "+totalSeats)
  // console.log(typeof passengerDetails +" "+passengerDetails)

  // for(let i=0;i<totalSeats;i++)
  // {
  //     console.log(passengerDetails.DOB[i] +" "+passengerDetails.Mnumber[i]+" "+passengerDetails.Name[i])
  // }*/

  try {
    for (let i = 0; i < totalSeats; i++) {
      // Update seat of that flight no
      const result = await Flight.updateOne(
        {
          $and: [
            { flightNo: fData.flightNo },
            { Seats: { $elemMatch: { seatNo: seatNumber[i] } } },
          ],
        },
        {
          $set: {
            "Seats.$.PassengerName": passengerDetails.Name[i],
            "Seats.$.PassengerMNumber": passengerDetails.Mnumber[i],
            "Seats.$.PassengerDOB": passengerDetails.DOB[i],
          },
        }
      );

      // Add History to passenger database
      const result2 = await Passenger.updateOne(
        {
          Email: email,
        },
        {
          $push: {
            History: {
              PassengerName: passengerDetails.Name[i],
              FlightNo: fData.flightNo,
              Airline: fData.Airline,
              Origin: fData.Origin,
              Via: fData.Via,
              Destination: fData.Destination,
              DepDT: fData.DepDT,
              ArvDT: fData.ArvDT,
              SeatNo: seatNumber[i],
              BookingDate: bookingDate,
            },
          },
        }
      );
    }

    res.json({ Status: "Good" });
  } catch (err) {
    console.log(err);
  }
});

// ------
app.post("/passenger", (req, res) => {
  let status = req.cookies.loginStatus;
  let email = req.cookies.userEmail;
  // console.log(status) undefined or string
  if (status == "true") {
    // let email = req.params.Email

    Passenger.find({ Email: email })
      .then((data) => {
        // console.log("Good")
        res.json(data[0].History);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/error.html");
  }
});

app.post("/cancel", async (req, res) => {
  let fNo = req.body.flightNumber;
  let sNo = req.body.seatNumber;
  let email = req.cookies.userEmail;
  try {
    // update that seat data on that flight
    let result = await Flight.updateOne(
      {
        $and: [{ flightNo: fNo }, { Seats: { $elemMatch: { seatNo: sNo } } }],
      },
      {
        $set: {
          "Seats.$.PassengerName": null,
          "Seats.$.PassengerMNumber": null,
          "Seats.$.PassengerDOB": null,
        },
      }
    );

    // delete that seat data from user history

    let result2 = await Passenger.updateOne(
      {
        Email: email,
      },
      {
        $pull: { History: { SeatNo: sNo } },
      }
    );

    console.log(`History data deleted from ${email} account`);
    res.status(200).json({ Message: "Successfull" });
  } catch (err) {
    res.status(400).json({ Message: "Unsuccessfull" });
    console.log(err);
  }
});

app.post("/storeQuary", (req, res) => {
  let name = req.body.Name
  let email = req.body.Email
  let msg = req.body.Msg

  let docObj = new Query({
    Name: name,
    Email: email,
    Query: msg
  });
  let result = docObj.save();

  result
    .then((data) => {
      console.log(data)
      console.log("Stored successfully");
      res.json({Message : "Stored successfully"})
    })
    .catch((err) => {
      console.log(err);
      res.json({Message : "Server Error.Please try again"})
    });
})

app.get("/logout", (req, res) => {
  let status = req.cookies.loginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.clearCookie("loginStatus");
    res.clearCookie("userName");
    res.clearCookie("userEmail");
    res.redirect("userLogin.html");
  } else {
    res.redirect("/error.html");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});
