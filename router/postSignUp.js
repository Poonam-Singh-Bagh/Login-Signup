const knex = require("../connection/knex_connection");
const bcrypt = require("bcrypt");

module.exports = async (Router) => {
  Router.post("/users/signup", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // console.log("hashedPassword", hashedPassword);
      knex
        .select("*")
        .from("users")
        .then((data) => {
          const user = {
            name: req.body.name,
            user_name: req.body.user_name,
            password: hashedPassword,
            email: req.body.email,
          };
          let flag = true;
          for (users of data) {
            if (users.user_name === user.user_name) {
              flag = false;
            } else {
              flag = true;
            }
          }
          if (flag) {
            knex("users")
              .insert(user)
              .then((data) => {
                res.status(201);
                res.json({ message: "Account created successfully" });
              })
              .catch((err) => {
                res.status(err.status || 500).send({
                  success: false,
                  message: err.message || "Internal Server Error",
                });
              });
          } else {
            res.status(403);
            res.json({
              message: "This username isn't available. Please try another.",
            });
          }
        });
    } catch (err) {
      console.log("err", err);
    }
  });
};
