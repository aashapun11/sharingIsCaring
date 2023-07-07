
const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        // Mongodb connection string
        const con = await mongoose.connect("mongodb+srv://aashamgr111:tarapun@cluster0.zq1pm69.mongodb.net/?retryWrites=true&w=majority",{
        
        })
        console.log('MongoDB connected: ${con.connection.host}');
    } catch(err){
        console.log(err);
        process.exit(1); //which is true
    }
}

module.exports = connectDB;