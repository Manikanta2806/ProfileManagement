const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db'); // Database Connection



// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const UserRoutes = require("./Routes/userRoutes");
const profileRoutes = require("./Routes/profileRoutes");

app.use('/api/users',UserRoutes);
app.use('/api/profile',profileRoutes);




const port= 4000;
app.get("/" , (req,res)=>{
    res.send("This is the profile manager ")
})
app.listen(port,()=>{
    console.log(`server running on port:http://localhost/${port}`)
});


