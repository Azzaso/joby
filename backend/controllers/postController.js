import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

//@desc get posts
//route GET /api/posts/
//@access PRIVATE
const getPosts = asyncHandler(async(req,res) => {
  const posts = await Post.find().sort({date:-1})
  res.status(200).json(posts)
})

//@desc create post 
//route POST /api/posts/:id
//@access PRIVATE
const createPost = asyncHandler(async(req,res) => {
  const {title, image, description} = req.body
  const newPost = await Post.create({
    user: req.user.id,
    name: req.user.name,
    title:title,
    image:image,
    description: description,
  })
  const post = await newPost.save();
  res.json(post);
})

//@desc delete post 
//route  POST /api/posts/:id
//@access PRIVATE
const deletePost = asyncHandler(async(req,res) => {
  const post = await Post.findById(req.params.id);
  if(post){
    await Post.deleteOne({_id: post._id});
    res.status(200).json({message:'post deleted'});
  }else{
    res.status(401);
    throw new Error('post not found')
  }
})

//@desc apply for a post (job offer)
//route PUT /api/posts/apply/:id
//@access PRIVATE
const applyForPost = asyncHandler(async(req,res)=> {
  const post = await Post.findById(req.params.id);
  const user = req.user;
  if(post){
    const alreadyApplied = post.applicants.find((apply) => apply._id.toString() === user._id.toString());
    if(alreadyApplied){
      res.status(400);
      throw new Error("you already applied for this post");
    }else{
      post.applicants.push(user._id);
      await post.save();
      post.numApplicants = post.applicants.length;
      res.status(200).json({message : "Application added", NumberOfApplications:post.numApplicants, Applicants:post.applicants});
    }
  }else{
    res.status(404).json({ message: "Post not found" });
  }
})


//@desc update post
//route PUT /api/posts/
//@access PRIVATE

 export {getPosts, createPost, deletePost,applyForPost};