const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postroutes = require('./routes/posts');

//app Middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postroutes);


const PORT = 8000;
const DB_URL = 'mongodb+srv://pathumc4:Chamara1@mernapp.xcj7k.mongodb.net/mernCrud?retryWrites=true&w=majority&appName=mernApp';

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


