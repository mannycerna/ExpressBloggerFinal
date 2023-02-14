// const { v4: uuidv4 } = require("uuid");
// var express = require("express");
// var router = express.Router();

// const { db } = require("../mongo");
// 
// router.get("/all", async function (req,res,next){
// 
// try {     
  // await db()
  // .collection('posts')
  // .find({}) 
  // .toArray(function(err, result){
    // if (err) {
      // res.status(400).send();
    // }else {
      // res.json({
        // sucess:true,
        // posts:result
      // });
    // }
  // });
// 
// } catch (error) { 
    500 error -> server side error 
    // res.status(500).send();
// }
// 
  ALTERNATE WAY TO WRITE IT
  throw an error if fails to populate blogPosts
  if (blogPosts.length == 0) {
    throw Error("No blog posts found");
  }
  // 
  res.json({
    success: true,
    posts: blogPosts, 
  });
// });
// 
// 
// // router.get("/get-one-example", async function (req, res, next) {
  // const blogPosts = await db()
  // .collection("posts") 
  // .findOne({
      // id: {
        // $exists: true,
      // },
  // });
// 
  // console.log(blogPosts);
// 
  // res.json({
    // success: true,
    // post: blogPost,
  // });
// });
// 
// 
// // router.get("/get-one/:id", async function (req, res, next) {
  checking if the parameter ID was passed in 
  // if (!req.params.id) {
    // res.json({
      // success: false,
      // // message: "The blog id must be provided in the url parameters",
    // });
    // return;
  // }
// 
  // console.log("first");
  await blocks the execution until the promise resolves
  aka. make sure line 47 finishes before we get on 
  with the rest of our program 
  // // const blogPosts = await db().collection("sample_blogs").findOne({
    // id: req.params.id,
  // }); /*.catch({
    // console.log("something went wrong");
  // });*/
  // console.log("second");
  we don't want to a user to see the result before post is loaded.
  so we use await, to block this from happening.
  // res.json({
    // success: true,
    // posts: blogPosts,
  // });
  NOTE: FIND ONE is READ operation, the output holds the results of the operation.
  so we add it in our res.json()
  // console.log("third");
// });
// 
// // router.post("/create-one", async function (req, res, next) {
  // try {
    // const newPost = {
      // id: uuidv4(),
      // createdAt: new Date(),
      // title: req.body.title,
      // text: req.body.text,
      // author: req.body.author,
      // email: req.body.email,
      // categories: req.body.categories,
      // starRating: Number(req.body.starRating),
    // };
// 
    debug: print out newPost
    // console.log(newPost);
// 
    Validation
// 
    // // if (newPost.email === undefined || !newPost.email.split("@").length > 1) {
// 
      // res.json({
        // success: false,
        // message: "email invalid",
      // });
    // }
// 
    because insertONE is a WRITE Operation, you don't need 
    to return insertOpREs to the user. Only do that when it's
    a READ operation i.e.e (find, findOne etc.. )
    // // await db().collection("sample_blogs").insertOne(newPost);
// 
    // res.json({
      // success: true,
      // newPost,
    // });
  // } catch (e) {
    // console.log(typeof e);
    // console.log(e);
    // res.json({
      // error: e.toString(),
    // });
  // }
// });
// 
// router.get("/get-multi", async function (req, res) {
  // const sortField = req.query.sortField;
  // const sortOrder = Number(req.query.sortOrder);
  // const limit = Number(req.query.limit);
  // const page = Number(req.query.page);
// 
  // console.log(sortField, typeof sortField);
  // console.log(sortOrder, typeof sortOrder);
  // console.log(limit, typeof limit);
  // console.log(page, typeof page);
// 
  // const skip = limit * (page - 1);
  // console.log(skip);
// 
	// const sortObject = {}
	// sortObject[sortField] = sortOrder 
  {title: 1} -> sort ascending 
  {title: -1} -> sort descending
// 
  // const blogs = await db()
  // .collection("sample_blogs")
  // .find({})
  // .sort(sortObject)
  // .limit(limit)
  // .skip(skip)
  // .toArray()
// 
  // res.json({
		// success: true,
		// blogs
	// });
// });
// 
// // router.delete('/delete-multi', async function (req, res) {
	// try {
      // 
      // const idsToDelete = req.body
// 
      // if (idsToDelete.length < 1){
        // throw Error("ids to delete empty!");
      // }
      // // const deleteResult = await db().collection("sample_blogs").deleteMany({
        // id: {
          // $in: idsToDelete
        // }
      // })
  // 
  // } catch (e) {
    // res.send(e);
  // }
	// res.json({
		// success: true,
		// deleteResult: deleteResult
	// })
// })
// 
// module.exports = router;
