const mongoose = require("mongoose");


async function DbConnection() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb DataBase is Connected Successfully");

    } catch (error) {
        console.log(error.message, "MongoDb Connection is Faild");

    }
};
  
module.exports = DbConnection; 