const mongoose = require("mongoose");
function connectToDb() {
  mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("mongodb connected"))
    .catch((error) => {
      console.log("Error Connecting to DB", error);
    });
}
module.exports = connectToDb;
