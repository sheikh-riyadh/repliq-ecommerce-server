const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

/* Middleware */
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send("Hey developer i am calling from server");
})
app.listen(port, () => {
    console.log("server runing on this", port)
})