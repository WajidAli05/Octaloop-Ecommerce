const express = require("express");
const logger = require('./config/logger/logger');
const morgan = require('morgan'); 
const cors = require('cors');
const app = express();
const env = require("dotenv");
const dbConnection = require("./config/database/dbConnection.js");
env.config();
app.use(express.json());

//create database connection
dbConnection();

//import user router
const userRouter = require("./routes/userRoutes");
const otpRouter = require('./routes/otpRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const shippingRouter = require('./routes/shippingRoutes.js');
const contactUsRouter = require('./routes/contactUsRoutes.js');


const morganFormat = ':method :url :status :response-time ms';
//middleware for logging using morgan and winston
app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],

      };
      logger.info(JSON.stringify(logObject));
    }
  }
}));

//use cors
app.use(cors());

//use user router
app.use("/user", userRouter);
app.use('/' , otpRouter);
app.use('/' , productRouter);
app.use('/' , cartRouter);
app.use('/' , shippingRouter);
app.use('/' , contactUsRouter);
//create app.listen and use PORT from .env file
const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})

