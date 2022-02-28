const knex = require("./knex_connection");

knex.schema.hasTable("users").then((exists) => {
  if (!exists) {
    return knex.schema
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("user_name");
        table.string("password");
        table.string("email");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  console.log("Table has created");
});
