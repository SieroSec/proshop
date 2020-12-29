import express from 'express'
const Router = express.Router()
import { getProductById, getProducts } from '../controllers/productController.js'

Router.route('/').get(getProducts)
Router.route('/:id').get(getProductById)

export default Router