const mongoose = require("mongoose");
const logger = require("../logger/logger.js");

//connect to the database
const dbConnection = async () =>{
    try{

        mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));

        const isConnected = await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }); 

        //check if connected or not
        if(isConnected){
            logger.info("Database connected successfully");
        }
    }
    catch(error){
        logger.error("Error connecting to the database", error.message);
        process.exit(1);
    }
}

module.exports = dbConnection;