const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { Admin, Airline, Flight, Query } = require("./dbConnect");
const app = express();
const port = 5700;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// All middleware for sending html is here

app.get("/", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/adminDashboard.html");
  } else {
    var Path = path.join(__dirname, "HTML", "\\adminLogin.html");
    res.sendFile(Path);
  }
});

app.get("/adminLogin.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/adminDashboard.html");
  } else {
    var Path = path.join(__dirname, "HTML", "adminLogin.html");
    res.sendFile(Path);
  }
});

app.get("/adminDashboard.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "adminDashboard.html");
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
    res.redirect("/adminLogin.html");
  }
});

app.get("/addFlight.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "addFlight.html");
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
    res.redirect("/adminLogin.html");
  }
});

app.get("/listFlight.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "listFlight.html");
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
    res.redirect("/adminLogin.html");
  }
});

app.get("/manageAirlines.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "manageAirlines.html");
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
    res.redirect("/adminLogin.html");
  }
});

app.get("/passengerList.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "passengerList.html");
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
    res.redirect("/adminLogin.html");
  }
});
app.get("/queryHistory.html", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "HTML", "queryHistory.html");
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
    res.redirect("/adminLogin.html");
  }
});

app.get("/error.html", (req, res) => {
  var Path = path.join(__dirname, "HTML", "\\error.html");
  res.sendFile(Path);
});

// All css file which is needed for admin side is rendering here

app.get("/adminLogin.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    res.redirect("/adminDashboard.html");
  } else {
    var Path = path.join(__dirname, "CSS", "adminLogin.css");
    res.sendFile(Path);
  }
});

app.get("/adminDashboard.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "adminDashboard.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/addFlight.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "addFlight.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/listFlight.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "listFlight.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/manageAirlines.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "manageAirlines.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/passengerList.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "passengerList.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/queryHistory.css", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "CSS", "queryHistory.css");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

// ----------------------------------------------

// JAVASCRIPT SCETION

app.get("/addFlight.js", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "addFlight.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/listFlight.js", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "listFlight.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/manageAirlines.js", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "manageAirlines.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/adminDashboard.js", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "adminDashboard.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

app.get("/passengerList.js", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    var Path = path.join(__dirname, "JAVASCRIPT", "passengerList.js");
    res.sendFile(Path);
  } else {
    res.redirect("/error.html");
  }
});

// Middleware section----------------------------

app.post("/login", (req, res) => {
  let email = req.body.Email;
  let pass = req.body.Password;
  const result = Admin.find({ Email: email, Password: pass });
  result
    .then((data) => {
      if (data.length == 0) {
        console.log("Login fail for admin");
        res.send(`<script>alert("Please check your email and password");
                window.location.href = "/adminLogin.html";
             </script>`);
      } else {
        res.cookie("adminLoginStatus", true, {
          expires: new Date(Date.now() + 30 * 24 * 3600000),
        });
        res.cookie("isDark", false, {
          expires: new Date(Date.now() + 30 * 24 * 3600000),
        });
        console.log("Admin successfully logged in");
        res.redirect("/adminDashboard.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// -------------------------------This middleware is going to be romoved-----------------------------------
app.post("/addFlight", (req, res) => {
  let depDate = req.body.depDate;
  let depTime = req.body.depTime;
  let arvDate = req.body.arvDate;
  let arvTime = req.body.arvTime;
  let origin = req.body.org.toUpperCase();
  let via = req.body.via.toUpperCase();
  let destination = req.body.dest.toUpperCase();
  let duration = req.body.duration;
  let flightno = req.body.flightno.toUpperCase();
  let airline = req.body.arl.toUpperCase();
  let fcPrice = req.body.first_class;
  let bcPrice = req.body.business_class;
  let ecPrice = req.body.economy_class;
  let fstatus = req.body.status.toUpperCase();
  // console.log(depDate + " " + depTime + " " + arvDate + " " + arvTime + " " + origin + " " + via + " " + destination + " " + duration + " " + flightno + " " + airline +
  //     " " + fcPrice + " " + bcPrice + " " + ecPrice + " " + status)
  let depdArray = depDate.split("-");

  let deptArray = depTime.split(":");

  let depObj = new Date(
    depdArray[0],
    depdArray[1] - 1,
    depdArray[2],
    deptArray[0],
    deptArray[1]
  );
  let arvdArray = arvDate.split("-");

  let arvtArray = arvTime.split(":");
  let arvObj = new Date(
    arvdArray[0],
    arvdArray[1] - 1,
    arvdArray[2],
    arvtArray[0],
    arvtArray[1]
  );

  // Creating seat array of objects
  let seatObj = [];
  for (let i = 0; i < 180; i++) {
    if (i < 30) {
      let seat = {
        seatNo: "F" + (i + 1),
        Class: "First class",
        Price: fcPrice,
        PassengerName: null,
        PassengerMNumber: null,
        PassengerDOB: null,
      };
      seatObj.push(seat);
    } else if (i >= 30 && i < 60) {
      let seat = {
        seatNo: "B" + (i - 30 + 1),
        Class: "Business class",
        Price: bcPrice,
        PassengerName: null,
        PassengerNumber: null,
        PassengerDOB: null,
      };
      seatObj.push(seat);
    } else {
      let seat = {
        seatNo: "E" + (i - 60 + 1),
        Class: "Economy class",
        Price: ecPrice,
        PassengerName: null,
        PassengerNumber: null,
        PassengerDOB: null,
      };
      seatObj.push(seat);
    }
  }

  if (arvObj == "Invalid Date") {
    let insertFlight = new Flight({
      flightNo: flightno,
      DepDT: depObj,
      Origin: origin,
      Via: via,
      Destination: destination,
      Duration: duration,
      Airline: airline,
      Status: fstatus,
      Seats: seatObj,
    });

    insertFlight
      .save()
      .then((data) => {
        console.log("Inserted one flight document");
        var Path = path.join(__dirname, "HTML", "addFlight.html");
        res.sendFile(Path);
      })
      .catch((err) => {
        console.log(err);
        var Path = path.join(__dirname, "HTML", "addFlight.html");
        res.sendFile(Path);
      });
  } else {
    let insertFlight = new Flight({
      flightNo: flightno,
      DepDT: depObj,
      ArvDT: arvObj,
      Origin: origin,
      Via: via,
      Destination: destination,
      Duration: duration,
      Airline: airline,
      Status: fstatus,
      Seats: seatObj,
    });

    insertFlight
      .save()
      .then((data) => {
        console.log("Inserted one flight document");
        var Path = path.join(__dirname, "HTML", "addFlight.html");
        res.sendFile(Path);
      })
      .catch((err) => {
        console.log(err);
        var Path = path.join(__dirname, "HTML", "addFlight.html");
        res.sendFile(Path);
      });
  }
});

app.post("/listFlight", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    const result = Flight.find();

    result
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.redirect("/error.html");
  }
});

app.post("/getListAirline", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  // console.log(status) undefined or string
  if (status == "true") {
    const result = Airline.find();

    result
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.redirect("/error.html");
  }
});

app.post("/updateListAirline", (req, res) => {
  let newAirlineName = req.body.Name;
  const insertDoc = new Airline({ Name: newAirlineName });
  insertDoc
    .save()
    .then(() => {
      console.log("successfully document inserted in airline collection");
    })
    .catch((err) => {
      console.log(err);
    });

  const result = Airline.find();
  result
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/listAirline/:a", (req, res) => {
  let airlineName = req.params.a;
  Airline.deleteOne({ Name: airlineName })
    .then((data) => {
      console.log(`Deleted document where name is ${airlineName}`);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/changeStatus", async function (req, res) {
  if (req.body.status == "onTimeTodeparture") {
    // console.log(req.body.flightNo)
    let response = Flight.updateOne(
      { flightNo: req.body.flightNumber },
      {
        $set: {
          Status: "DEPARTED",
        },
      }
    );

    response
      .then((data) => {
        const result = Flight.find();

        result
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.status == "departedToArrived") {
    // console.log(req.body.flightNo)
    let response = Flight.updateOne(
      { flightNo: req.body.flightNumber },
      {
        $set: {
          Status: "ARRIVED",
        },
      }
    );

    response
      .then((data) => {
        const result = Flight.find();

        result
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.status == "arriveToOnTime") {
    let response = Flight.updateOne(
      { flightNo: req.body.flightNumber },
      {
        $set: {
          Status: "ON TIME",
        },
      }
    );

    response
      .then((data) => {
        const result = Flight.find();

        result
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.status == "onTimeToissue") {
    let newTime = req.body.NewTime;
    console.log(newTime);
    const depObj = Flight.find({ flightNo: req.body.flightNumber })
      .then((data) => {
        // console.log(data[0].DepDT)
        return data[0].DepDT;
      })
      .catch((err) => {
        console.log(err);
      });

    const fun = async () => {
      const a = await depObj;
      let minute = a.getMinutes();
      a.setMinutes(minute + parseInt(newTime));
      const result = await Flight.updateOne(
        { flightNo: req.body.flightNumber },
        {
          $set: {
            Status: "ISSUE",
            DepDT: a,
          },
        }
      );

      const result2 = Flight.find();

      result2
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fun();
  } else if (req.body.status == "issueToOntime") {
    let response = Flight.updateOne(
      { flightNo: req.body.flightNumber },
      {
        $set: {
          Status: "ON TIME",
        },
      }
    );

    response
      .then((data) => {
        const result = Flight.find();

        result
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.put("/updateFlightStatus", async (req, res) => {
  const flightNumber = req.body.flightNumber;
  const newStatus = req.body.newStatus;

  try {
    const response = await Flight.updateOne(
      { flightNo: flightNumber },
      { $set: { Status: newStatus } }
    );

    if (response.nModified === 1) {
      console.log(`Flight ${flightNumber} status updated to ${newStatus}`);
      res.json({ message: "Flight status updated successfully" });
    } else {
      res.status(404).json({ error: "Flight not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete('/deleteFlight/:flightNumber', async (req, res) => {
  const flightNumber = req.params.flightNumber;
  try {
    const response = await Flight.deleteOne({ flightNo: flightNumber });
    if (response.deletedCount === 1) {
      res.json({ success: true, message: `Flight ${flightNumber} deleted successfully` });
    } else {
      res.json({ success: false, message: 'Flight not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post("/showQuery", (req, res) => {
  let response = Query.find();
  response
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/deleteQuery/:id", (req, res) => {
  let id = req.params.id;

  let result = Query.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

  result
    .then((data) => {
      console.log(data);
      res.json({ Message: "Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ Message: "Error" });
    });
});

app.get("/logout", (req, res) => {
  let status = req.cookies.adminLoginStatus;
  if (status == "true") {
    res.clearCookie("adminLoginStatus");
    res.clearCookie("isDark");

    res.redirect("/adminLogin.html");
  } else {
    res.redirect("/error.html");
  }
});

app.listen(port, () => {
  console.log(`Admin site is running on port ${port}..........`);
});
