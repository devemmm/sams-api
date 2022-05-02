const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return console.log("Connected to database ...");
  })
  .catch((error) => {
    console.log(error);
    return console.log("connecting to database failed");
  });
