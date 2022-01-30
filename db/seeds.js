
require("dotenv").config();
const mongoose = require("mongoose");

// connection to the DB
require("./index");

// executes seeds to DB
require("./seeds/01.seeds.users")
require("./seeds/02.seeds.babies")
require("./seeds/03.seeds.foodgroups")
require("./seeds/04.seeds.intolerances")
require("./seeds/05.seeds.tips")
require("./seeds/06.seeds.recipes")


// Since all the code is async, I can't control when it finishes seeding all tables. 
// Therefore, after many combinations, I'll just (for now) use a TimeOut before closing the DB connection. 
// Another option would be to do a huge seeds file including everything.

setTimeout(() => {
    mongoose.disconnect();
}, 3000)
