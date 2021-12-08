// package that makes the connection with mongodb
const mongoose = require("mongoose");

// Sets the MongoDB URI for the app to have access to it.
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const db = mongoose.connection;

// When successfully connected
db.once("connected", () => console.log("Database connection open"));

// When the connection is disconnected
db.on("disconnected", () => console.log("Database connection disconnected"));

// If the connection throws an error
db.on("error", (err) => console.error(`Database connection error: ${err}`));

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {      //  ==> SIGnal INTerrupted
  db.close(() => {
    console.log("Database connection disconnected through app termination");
    process.exit(0);
  });
});