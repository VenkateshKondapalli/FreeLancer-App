const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "backend-template-db",
  })
  .then(() => {
    console.log("-----DB Connected-----");
  })
  .catch((err) => {
    console.log("-----DB Connection error------");
    console.log(err.message);
  });
