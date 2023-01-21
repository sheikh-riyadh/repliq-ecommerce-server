const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
        const productsCollection = client.db('repliq-ecommerce').collection('products')
        app.get('/', async (req, res) => {
            const query = {}
            const products = await productsCollection.find(query).toArray()
            res.send(products)
        })
    } finally {

    }
}
run().catch(e => console.error(e))




app.get('/', async (req, res) => {
    res.send("Hey developer i am calling from server");
})
app.listen(port, () => {
    console.log("server runing on this", port)
})