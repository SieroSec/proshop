import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'variable NODE_ENV is not defined'

app.listen(PORT, () => {
   console.log(`App listening in ${NODE_ENV} mode on port ${PORT}!`);
});

app.get('/', (req, res) => {
   res.send('API is running...');
});

app.get('/api/products', (req, res) => {
   res.json(products);
});

app.get('/api/products/:id', (req, res) => {
   const product = products.find(p => p._id === req.params.id);
   res.json(product);
});