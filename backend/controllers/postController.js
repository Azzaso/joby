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
  const {image, description} = req.body
  const newPost = await Post.create({
    user: req.user.id,
    name: req.user.name,
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
  const post = await Post.findById(req.post.params.id);
  if(post){
    res.status(200).json({message:'post deleted'})
  }else{
    res.status(401)
    throw new Error('post not found')
  }
})

//@desc update post
//route PUT /api/posts/
//@access PRIVATE
const updatePost = asyncHandler(async(req,res) => {
  res.status(200).json({message:'post updated'})
})
 export {getPosts, createPost, deletePost, updatePost};