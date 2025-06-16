require('dotenv/config');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Router = require("./src/routes/router")
const cookieParser=require('cookie-parser');


const app = express();

const cors=require('cors')

const allowedOrigins = ['https://code.ddks.tech', 'http://localhost:5174','http://localhost:5173','http://98.70.54.166'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  credentials:true
}));



const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true})
);

app.use("/", Router);

app.listen(port, () => {
    console.log(`Server listening at port:${port}`)
});