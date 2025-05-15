import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home"
import AddProfile from "./Profile/AddProfile";
import UpdateProfile from "./Profile/UpdateProfile";
import DeleteProfile from "./Profile/DeleteProfile";

function App() {
    return (
  
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/addprofile" element={<AddProfile />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route path="/deleteprofile" element={<DeleteProfile />} />
                    
                </Routes>
            </Router>
           
    );
}

export default App;
