require('dotenv').config({path: '../.env'});
const express = require('express')
const app = express()
const port = 5000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./routes/')(app);

app.get('/', (req, res) => {
    res.send(`Listening on port ${port}.`);
})

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`Example app listening on port ${port}!`)
})