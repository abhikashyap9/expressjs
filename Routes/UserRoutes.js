const express=require('express')
const userRouter=express.Router()
const UserController=require('../Controller/UserController')

userRouter
.route('/')
.post(UserController.saveUsers)
.get(UserController.getUsers)
.delete(UserController.deleleteUser)

module.exports=userRouter
