// Dependencies
var express = require("express");
var path = require("path");

// Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var reservations = [
    {
        name: "eater",
        phoneNumber: "123",
        email: "123",
        id: 1
    }
];

var waitlist = [
    {
        name: "waiter",
        phoneNumber: "123",
        email: "123",
        id: 1
    }
]

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/tables/current", function(req, res) {
    return res.json(reservations);
});

app.get("/tables/current/:id", function(req, res) {
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
})

app.post("/tables/current", function(req, res) {
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

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});