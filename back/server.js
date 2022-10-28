//requires and server app
const app = require("./app");

app.set("port", 5000);

const db = require("./models/database.js");

db.sync({ force: false })
  .then(() => {
    const server = app.listen(app.get("port"), () => {
      console.log("Express server listening on port " + server.address().port);
    });
  })
  .catch((err) => {
    console.log("Problem starting");
    console.error(err);
  });
