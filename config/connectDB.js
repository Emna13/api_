const mongoose = require("mongoose");
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("The data base is connected");
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports = connectDB;
