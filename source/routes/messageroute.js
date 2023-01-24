const express = require("express");
const user = require("../controllers/messagecontroller");

const routes2 = express.Router();

routes2.get("/",user.getmessages);
routes2.get("/:id",user.getonemessage);
routes2.post("/",user.postMessage);
routes2.delete("/:id",user.deleteMessage);
routes2.put("/:id",user.updateMesage);

module.exports = routes2;