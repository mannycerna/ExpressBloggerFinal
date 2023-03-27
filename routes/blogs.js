const { v4: uuidv4 } = require("uuid");
const { db } = require("../mongoose");
var express = require("express");
var router = express.Router();

// const Blog = require('../models/Blogs'); //refactored to line below (blogsController)
const blogsController = require('../controllers/blogsController');
router.get('/all', blogsController.getAllBlogs); 
router.post("/create-one",  blogsController.createOneBlog);
router.get("/getOneBlog/:title", blogsController.getOneBlog);
router.put("/update-one/:id", blogsController.updateOneBlog);
router.get("/get-one/:id", blogsController.getOneBlogById);
router.get("/delete-one/:id", blogsController.deleteOneBlog);
router.get("/get-multiple", blogsController.getMultipleBlogs);
router.delete('/delete-multiple', blogsController.deleteMultipleBlogs);

module.exports = router;
