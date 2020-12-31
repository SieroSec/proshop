import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
   let token //= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTlmODU4N2MxNzVjMjk4MGQ5ZWFmOSIsImlhdCI6MTYwOTQxNjY0OSwiZXhwIjoxNjEyMDA4NjQ5fQ.8avZI8oC6jWQGlxULdY4ocdxqWzu1UrNZRhDrVQFTmg'

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // console.log(`Token found: ${req.headers.authorization}`)
      try {
         // split token from "Bearer" text
         token = req.headers.authorization.split(' ')[1]
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         // decoded = { id: '5fe9f8587c175c2980d9eaf9', iat: 1609416649, exp: 1612008649 }

         req.user = await User.findById(decoded.id).select('-password')

         next()
      } catch (error) {
         //console.error(error)
         res.sendStatus(401)
         throw new Error('Not Authorized, token failed')
      }
   }

   if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
   }


})

export { protect }