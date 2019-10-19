// Dependencies
var express = require("express");
var path = require("path");

// Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

var reservations = [
    {
        name: "John",
        phoneNumber: "(425)-111-1111",
        email: "john@gmail.com",
        id: 50
    }
];

var waitlist = [
    {
        name: "Jane",
        phoneNumber: "(360)-222-2222",
        email: "jane@gmail.com",
        id: 7
    }
]

// Routes

// Gets all the files in the public folder
app.use(express.static("Public"));

// Home
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Table View
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/tables.html"))
});

// Reservation Page
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/reserve.html"))
});

// Displays json of current tables
app.get("/api/tables/", function(req, res) {
    return res.json(reservations);
});

// Displays json of waiting tables
app.get("/api/waitlist/", function(req, res) {
    return res.json(waitlist);
});

// Displays reservation info based on id
app.get("/tables/:id", function(req, res) {
    var chosen = parseInt(req.params.id);
    console.log(chosen);
    for (var i = 0; i < reservations.length; i++) {
        if (chosen == reservations[i].id) {
            return res.json(reservations[i]);
        }
    }
    for (var i = 0; i < waitlist.length; i++) {
        if (chosen == waitlist[i].id) {
            return res.json(waitlist[i]);
        }
    }
    return res.json(false);
});

// Post for current tables
app.post("/api/tables/", function(req, res) {
    var newReservation = req.body;
    newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    console.log(reservations);
    if (reservations.length < 5) {
        reservations.push(newReservation);
        console.log("pushed to reservations");
    } else {
        waitlist.push(newReservation);
        console.log("pushed to waitlist");
    }
    res.json(newReservation);
});

// Post for waiting tables
app.post("/api/waitlist/", function(req, res) {
    var newReservation = req.body;
    newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    console.log(reservations);
    if (reservations.length < 5) {
        reservations.push(newReservation);
        console.log("pushed to reservations");
    } else {
        waitlist.push(newReservation);
        console.log("pushed to waitlist");
    }
    res.json(newReservation);
});

// Clears tables
app.get("/api/clear/", function(req, res) {
    reservations.length = 0;
    waitlist.length = 0;
    res.json({ok: true});
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});