const express = require("express");
const user = require("../controllers/usercontroller");

const routes1 = express.Router();

routes1.get("/",user.getUsers);
routes1.get("/:id",user.getoneuser);
routes1.post("/",user.postuser);
routes1.delete("/:id",user.deleteuser);
routes1.put("/:id",user.updateuser);

module.exports = routes1;