// package that makes the connection with mongodb
const mongoose = require("mongoose");

// Sets the MongoDB URI for the app to have access to it.
const MONGO_URI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(MONGO_URI, options)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


// Some logs:

// When successfully connected
mongoose.connection.once("connected", () => console.log("Database connection open"));

// When the connection is disconnected
mongoose.connection.on("disconnected", () => console.log("Database connection disconnected"));

// If the connection throws an error
mongoose.connection.on("error", (err) => console.error(`Database connection error: ${err}`));

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {      //  ==> SIGnal INTerrupted
  mongoose.connection.close(() => {
    console.log("Database connection disconnected through app termination");
    process.exit(0);
  });
});