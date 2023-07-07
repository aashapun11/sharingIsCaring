
const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        // Mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_CONNECTION_URL,{
           
        
           
        })

        console.log('MongoDB connected: ${con.connection.host}');
    } catch(err){
        console.log(err);
        process.exit(1); //which is true
    }
}

module.exports = connectDB;