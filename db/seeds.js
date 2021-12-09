require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(MONGO_URI, options)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    // executes seeds to DB
    require("./seeds/seeds.users")
    require("./seeds/seeds.babies")
    require("./seeds/seeds.foodgroups");
    require("./seeds/seeds.intolerances");
    require("./seeds/seeds.tips");
    //require("./seeds/seeds.recipes");

  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


