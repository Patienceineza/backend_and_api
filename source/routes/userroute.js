const express = require("express");
const user = require("../controllers/usercontroller");
const validate = require('../middlewares/signupmiddlewares')
const authenticate = require('../jwt/authenticate')
const routes1 = express.Router();

routes1.get("/", user.getUsers);
routes1.get("/:id",user.getoneuser);
routes1.post("/",user.postuser);
routes1.delete("/:id",user.deleteuser);
routes1.put("/:id",authenticate,user.updateuser);

routes1.post("/login",user.login);
module.exports = routes1;