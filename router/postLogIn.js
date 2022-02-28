const knex = require("../connection/knex_connection");
const bcrypt = require("bcrypt");

module.exports = (Router) => {
  Router.post("/users/login", (req, res) => {
    knex
      .select("*")
      .from("users") //.Where email is req.body.email
      .then(async (data) => {
        const user = {
          password: req.body.password,
          email: req.body.email,
        };
        let flag = true;
        try {
          // const password = await bcrypt.compare(user.password, users.password);
          // console.log("password", password);
          for (users of data) {
            const password = await bcrypt.compare(
              users.password,
              users.password
            );
            console.log("password", password);
            console.log(
              "data",
              await bcrypt.compare(users.password, users.password)
            );
            if (
              users.email === user.email &&
              password
              // users.password === user.password
            ) {
              flag = true;
            } else {
              flag = false;
            }
          }
        } catch (err) {
          console.log(err);
        }
        if (flag) {
          res.status(201);
          res.json({ message: "User logged in successfully" });
          //   knex("users")
          //     .insert(user)
          //     .then((data) => {
          //       res.status(201);
          //       res.json(user);
          //     })
          //     .catch((err) => {
          //       res.status(err.status || 500).send({
          //         success: false,
          //         message: err.message || "Internal Server Error",
          //       });
          //     });
        } else {
          res.status(401); //401 Unauthorized or 403 Forbidden or 404 Not Found
          res.json({
            message:
              "The email you entered doesn't belong to an account or your password was incorrect. Please check your password again.",
          });
        }
      });
  });
};
