require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/", allRoutes);

const usersRouter = require("./routes/users.routes");
app.use("/users", isAuthenticated, usersRouter);

const weeksRouter = require("./routes/weeks.routes");
app.use("/weeks", isAuthenticated, weeksRouter);

const goalsRouter = require("./routes/goals.routes");
app.use("/goals", isAuthenticated, goalsRouter);

const foodgroupsRouter = require("./routes/foodgroups.routes");
app.use("/foodgroups", isAuthenticated, foodgroupsRouter);

const intolerancesRouter = require("./routes/intolerances.routes");
app.use("/intolerances", isAuthenticated, intolerancesRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
