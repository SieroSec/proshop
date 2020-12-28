import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();
connectDB();

const app = express();

// // middleware example
// app.use((req, res, next) => {
//    console.log('HELLLO');
//    console.log(req)
//    // console.log(res)
//    next();
// })

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'variable NODE_ENV is not defined'

app.listen(PORT, () => {
   console.log(`App listening in ${NODE_ENV} mode on port ${PORT}!`.yellow.bold);
});

app.get('/', (req, res) => {
   res.send('API is running...');
});

app.use('/api/products', productRoutes)

// custom error handling in ./routes/productRoutes.js
app.use(notFound)
app.use(errorHandler)