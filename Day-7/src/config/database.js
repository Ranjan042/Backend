const mongoose = require("mongoose");

function connecttodb() {
    mongoose.connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log("Connected to the Database");
    })
    .catch((err) => {
        console.log("Database connection failed ❌");
        console.error(err.message);
    });
}

module.exports=connecttodb