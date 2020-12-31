import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   // find user by email
   const user = await User.findOne({ email: email })

   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      })
   } else {
      res.status(401)
      throw new Error('Invalid email or password')
   }

})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
   // find user by id
   const user = await User.findById(req.user._id)

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      })
   } else {
      res.status(404)
      res.send('User not found')
   }
})

export { authUser, getUserProfile }