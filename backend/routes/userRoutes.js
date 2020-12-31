import express from 'express'
const Router = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

Router.post('/login', authUser)

// route '/profile' will have GET and POST requests --> Router.route() method to implement that
// to 'insert' middleware in .get() we use midleware function as first arg.
Router.route('/profile').get(protect, getUserProfile)

export default Router