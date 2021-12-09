require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/", allRoutes);

const weeksRouter = require("./routes/weeks.routes");
app.use("/weeks", isAuthenticated, weeksRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;