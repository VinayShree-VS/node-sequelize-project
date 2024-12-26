
const express = require("express");
const Router = express.Router();
const {handleUserLogin} = require("../controllers/user.controller");

Router.post("/login-user",handleUserLogin)


module.exports = Router;