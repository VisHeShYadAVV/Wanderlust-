// WanderLust

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js")
const path=require("path")

main().then(() =>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.get("/",(req,res)=>{
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


app.get("/listings", async (req,res) =>{
    const allListings=await Listing.find({});
    res.render("listings/index", {allListings}); 
});

app.listen(8080,()=>{
    console.log("server is running on 8080");
});
