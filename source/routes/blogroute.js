const express = require("express");
const blog = require("../controllers/blogcontroller");

const routes = express.Router();

routes.get("/",blog.getblogs);
routes.get("/:id",blog.getone);
routes.post("/",blog.posting);
routes.delete("/:id",blog.deleting);
routes.put("/:id",blog.updating);
module.exports = routes;