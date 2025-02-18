// WanderLust

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.send("Hi, i am root");
});

// app.get("/testListing", async(req,res) =>{
//     let sampleListing= new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });




// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});


//NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing); // Save the new listing
    await newListing.save();
    res.redirect("/listings"); // Redirect to listings after saving
});

app.listen(8080, () => {
    console.log("server is running on 8080");
});
