const express = require('express');
const router = require("./src/routes/api")
const app = new express();
const bodyParse = require("body-parser");
const path = require("path");

//security library import ------------->>>>
const reteLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss =require("xss-clean");
const hpp = require('hpp')
const cors = require("cors");

//DataBase  library import -------->>>
const mongoose = require("mongoose")
app.use(express.static("client/build"))

//security library implement ------------>>>>>>>>>
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

// bodyParse implement for handle json data ----->>>>
app.use(bodyParse.json());

/// ratelismint  implement for hendle reququest ------->>
const limiter = reteLimit({windowMs:10* 60 * 1000 , max:3000})
app.use(limiter);

// connect MongoDB dataBase
// let database = 'mongodb+srv://<User>:<pass>@cluster0.4bj1re8.mongodb.net/BusinessTable'

let database = 'mongodb+srv://<user>:<pass>@cluster0.am8jyr5.mongodb.net/BUSNESS-TABLE?retryWrites=true&w=majority'

let OPTION={user:'testcrud991',pass:'testcrud991',autoIndex:true}

mongoose.connect(database, OPTION,(err)=>{
    if(!err){
        console.log('DataBase Connected')
    }else {
        console.log('DataBase Connect Fail ===>>',err)
    }
})




//BackEND Routing implement ------>>>>
app.use('/api/v1', router)

/// FrontEND routing implement --->>>>
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
});

// export app for server .js
module.exports= app