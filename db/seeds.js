
require("dotenv").config();

// executes seeds to DB
require("./seeds/seeds.users")
require("./seeds/seeds.foodgroups")
require("./seeds/seeds.intolerances")
require("./seeds/seeds.tips")

// to exacuter after:
//require("./seeds/seeds.recipes")
//require("./seeds/seeds.babies")
