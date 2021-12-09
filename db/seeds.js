
require("dotenv").config();

// connects to DB
require("./index");

// executes seeds to DB
require("./seeds/seeds.users")
require("./seeds/seeds.foodgroups");
require("./seeds/seeds.intolerances");
require("./seeds/seeds.tips");

//require("./seeds/seeds.recipes");
