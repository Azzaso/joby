import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js'

//@desc Auth user/set token
//route POST /api/users/auth
//@access PUBLIC

const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
 
  if(user && await user.matchPasswords(password)){
    generateToken(res, user._id);
    res.status(201).json({ message:'User authenticated', name: user.name, email: user.email })
  }
  else{
    res.status(401);
    throw new Error('invalid email or password')
  }
  
})

//@desc Reg user/set token
//route POST /api/users
//@access PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const {name, role, email, password} = req.body;
  
  const userExists = await User.findOne({email});
  if(userExists){
    res.status(400);
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    role,
    email,
    password
  })

  if (user){
    generateToken(res, user._id)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      role: user.role
    })
  }
  else{
    res.status(400)
    throw new Error('Invalid user data');
  }
});

//@desc logout user/set token
//route POST /api/users/logout
//@access PUBLIC

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({message: 'logout User'})
})

//@desc get user profile
//route GET /api/users/profile
//@access PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name:req.user.name,
    email:req.user.email
  }
  res.status(200).json(user)
})

//@desc get users
//route get /api/users/
//@access PRIVATE
 const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({date:-1})
  res.status(200).json(users);
 })

//@desc update user profile
//route PUT /api/users/profile
//@access PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name : updatedUser.name,
      email : updatedUser.email
    });
  }else{
    res.status(400)
    throw new Errow('User not found');
  }
})

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers};