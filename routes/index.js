var express = require('express');
var router = express.Router();

const Blog = require('../models/Blogs');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try{
      const allBlogs = await Blog.find({})
      res.json({blogs: allBlogs});
  } catch(e){
    console.log(e);
  }
  // res.render('index', { title: 'Express' });
});

// router.post("/create-one", async (req, res)=>{
//   try{

//   } catch {
    
//   }
// })
module.exports = router;
