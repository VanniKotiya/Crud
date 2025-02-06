const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//import routes
const postroutes = require('./routes/posts');

//app Middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postroutes);

const PORT=process.env.PORT;
const DB_URL=process.env.DB_URL;
mongoose.connect(DB_URL)
.then (() =>{
    console.log('DB Connected')
})
.catch((err) =>{
    console.log('DB Connection Error',err);
})

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});


