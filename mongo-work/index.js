const express = require("express");
const mongoose = require("mongoose");
const app = express ();
const port = 5500;

app.use(express.json());

mongoose.connect("mongodb+srv://Mongo:9835795451@cluster0.tyulsdf.mongodb.net/assign")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Could not connect", err));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

const User = mongoose.model("user", userSchema);


app.post("/users", async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).send(user);
    }
    catch(err){
        res.status(400).send(err);
    }
})


app.post("/multiusers", async (req, res) => {
    try{
        const users = await User.insertMany(req.body);
        res.status(201).send(users);
    }
    catch (err){
        res.status(400).send(err);
    }
})

app.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.status(500).send(err);
    }
});



app.get("/users/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).send("User not found");
        }

        res.send(user);
    }
    catch(err){
        res.status(500).send(err);
    }
});




app.put("/users/:id", async (req, res) => {
    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!user){
            return res.status(404).send("User not found");
        }

        res.send(user);

    }
    catch(err){
        res.status(400).send(err);
    }
});



app.patch("/users/:id", async (req, res) => {
    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!user){
            return res.status(404).send("User not found");
        }

        res.send(user);

    }
    catch(err){
        res.status(400).send(err);
    }
});


app.delete("/users/:id", async (req, res) => {
    try{

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");

    }
    catch(err){
        res.status(500).send(err);
    }
});


app.listen(port, () => {
    console.log("Server start");
})