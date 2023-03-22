const Blog = require('../models/Blogs');


async function getAllBlogs(req, res, next) {

    try{
        const allBlogs = await Blog.find({})
        res.json({blogs: allBlogs});
    } catch(e){
      console.log(e);
    }

  };


async function createOneBlog(req, res, next) {

    try {
      //parse out fields from POST request
      const title = req.body.title
      const text = req.body.text
      const author = req.body.author
      const categories = req.body.categories
      const starRating = req.body.starRating
      const year = req.body.year
      
      /*pass fields to new Blog model notice how mongoose allows for clear organization and type checking of fields automatically based on schema (models/Blogs.js)*/
      const newBlog = new Blog({
        title,
        text,
        year,
        author,
        categories,
        starRating,
      });
  
      //save our new entry to the database
      const savedData = await newBlog.save();
      
      //return the request to the user
      res.json({
        success: true,
        blogs: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  };

  async function getOneBlog(req, res) {
    let oneBlogPost;
    
    try { 
        oneBlogPost = await Blog.findOne({title: req.params.title});
    } catch (error) {
        console.log(error);        
    }
    res.json({
        success: true,
        oneBlog: oneBlogPost
    })
  }

  async function getOneBlogById(req, res, next) {
    // checking if the parameter ID was passed in 
    if (!req.params.id) {
      res.json({
        success: false,
        message: "The blog id must be provided in the url parameters",
      });
      return;
    }
  
    console.log("first");
    // await blocks the execution until the promise resolves
    // aka. make sure line 47 finishes before we get on 
    // with the rest of our program 
    try{
    const blogPosts = await Blog.findOne({
      _id: req.params.id,
    }).catch ((error) => {
      console.log("something went wrong");
    });
    console.log("second");
    res.json({
      success: true,
      posts: blogPosts,
    });
  } catch(e){
    console.log(e);
  }
    // NOTE: FIND ONE is READ operation, the output holds the results of the operation.
    // so we add it in our res.json()
    console.log("third");
  };

  async function updateOneBlog(req,res) {
    const entryId = req.params.id;
    try {
        await Blog.updateOne({id: entryId}, {title: "Blue"});
    } catch (error) {
        console.log(error);
        throw error;        
    }
    res.json({
        success: true,
        message: `blog entry id ${entryId} updated`
    });
  }
  
  async function deleteOneBlog(req,res){
    const entryId = req.params.id;
    try {
        await Blog.deleteOne({id: entryId});
    } catch (error) {
        console.log(error);
        throw error;
    }

    res.json({
        success: true,
        message: `blog entry id ${entryId} deleted`
    })
  }



  async function getMultipleBlogs(req, res) {
    const sortField = req.query.sortField;
    const sortOrder = Number(req.query.sortOrder);
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
  
    console.log(sortField, typeof sortField);
    console.log(sortOrder, typeof sortOrder);
    console.log(limit, typeof limit);
    console.log(page, typeof page);
  
    const skip = limit * (page - 1);
    console.log(skip);
  
      const sortObject = {}
      sortObject[sortField] = sortOrder 
    {title: 1}  sort(ascending)
    {title: -1} sort(descending)
  
    const blogs = await Blog()
    .find({})
    .sort(sortObject)
    .limit(limit)
    .skip(skip)
    .toArray()
  
    res.json({
          success: true,
          blogs
      });
  };

  async function deleteMultipleBlogs(req, res){ 
	try {
      
      const idsToDelete = req.body

      if (idsToDelete.length < 1){
        throw Error("ids to delete empty!");
      }
      const deleteResult = await db().collection("sample_blogs").deleteMany({
        id: {
          $in: idsToDelete
        }
      }) 
    } catch (e) {
    res.send(e);
  }
	res.json({
		success: true,
		deleteResult: deleteResult
	  })
  };

module.exports = {
    getAllBlogs,
    createOneBlog,
    getOneBlog,
    updateOneBlog,
    deleteOneBlog,
    getOneBlogById,
    getMultipleBlogs,
    deleteMultipleBlogs,
};