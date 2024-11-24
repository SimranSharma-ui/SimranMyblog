const express = require("express");
const { register, login, logout,getMyProfile, getAdmins,updateUser } = require("../controller/userController");
const { isAuthenticated } = require("../midleware/Authmidleware");


const router = express.Router();
router.post("/register",register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout);
router.put('/updateUser/:id',updateUser)
router.get('/getMy-Profile',isAuthenticated, getMyProfile);
router.get('/Alladmins',getAdmins);

module.exports = router;
