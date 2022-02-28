const knex = require("../connection/knex_connection");

module.exports = (Router) => {
  Router.get("/", (req, res) => {
    res.send("Home Page");
  });

  Router.get("/users", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((data) => {
        res.json(data);
        res.status(200).send({
          success: true,
          message: "Successful!",
          data: organizationPlan,
        });
      })
      .catch((err) => {
        res.json({ message: err });
        res.status(400);
        res.json({ message: "Bad Request" });
      });
  });

  //Error :- UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

  // Router.get("/users/login", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((data) => {
  //       res.json(data);
  //       res.status(200).send({
  //         success: true,
  //         message: "Successful",
  //         data: organizationPlan,
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({ message: err });
  //       res.status(400);
  //       res.json({ message: "Bad Request" });
  //     });
  // });
};
