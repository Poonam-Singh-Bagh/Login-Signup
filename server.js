const express = require("express");
const knex = require("./connection/create_table");
const router = express.Router();

const app = express();
app.use(express.json());
app.use("/", router);

require("./router/postSignUp")(router);
require("./router/postLogIn")(router);
require("./router/getApi")(router);

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
