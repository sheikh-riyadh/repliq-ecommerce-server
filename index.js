const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

/* Middleware */
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wjboujk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        /* All Collections here */
        const productsCollection = client.db('repliq-ecommerce').collection('products')
        const addToCartCollection = client.db('repliq-ecommerce').collection('add-to-cart')


        /* Get all products from here */
        app.get('/', async (req, res) => {
            const query = {}
            const products = await productsCollection.find(query).toArray()
            res.send(products);
        });

        /* Get all cart product from here */
        app.get('/add-to-cart', async (req, res) => {
            const email = req.query.email
            const query = { buyerEmail: email }
            const addToCartProducts = await addToCartCollection.find(query).toArray()
            res.send(addToCartProducts)
        })

        /* Save purchase product */
        app.post('/add-to-cart', async (req, res) => {
            const product = req.body;
            const result = await addToCartCollection.insertOne(product);
            res.send(result)
        });

        /* Delete single cart product here */
        app.delete('/add-to-cart/:id', async (req, res) => {
            query = { _id: ObjectId(req.params.id) }
            const result = await addToCartCollection.deleteOne(query)
            res.send(result)
        })




    } finally {

    }
}
run().catch(e => console.error(e));




app.get('/', async (req, res) => {
    res.send("Hey developer i am calling from server");
})
app.listen(port, () => {
    console.log("server runing on this", port);
})