
require("dotenv").config();

// executes seeds to DB
require("./seeds/seeds.users")
require("./seeds/seeds.babies")
require("./seeds/seeds.foodgroups");
require("./seeds/seeds.intolerances");
require("./seeds/seeds.tips");

//require("./seeds/seeds.recipes");
