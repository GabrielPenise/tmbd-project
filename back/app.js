const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes/index.js");
const cokie = require("cookie-parser");
const cors = require("cors");

//const routes = require("./routes");
const whiteList = ["http://localhost:5173", "http://localhost:5000"];

const app = express();
app.use(cors({ origin: [whiteList] }));

if (process.env.MODE !== "grade") {
  app.use(
    morgan(
      "      ↓ received :method :url · responded :status :res[Content-Type]"
    )
  );
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cokie());
app.use("/api", routes);

app.get("/", function (req, res, next) {
  res.send("Functional SV");
});

//app.use("/", routes);

// custom error handling
app.use(function (err, req, res, next) {
  // just in case
  if (!err.stack || !err.message) next(err);
  // clean up the trace to just relevant info
  const cleanTrace = err.stack
    .split("\n")
    .filter((line) => {
      // comment out the next two lines for full (verbose) stack traces
      const projectFile = line.indexOf(__dirname) > -1; // omit built-in Node code
      const nodeModule = line.indexOf("node_modules") > -1; // omit npm modules
      return projectFile && !nodeModule;
    })
    .join("\n");

  console.log(err.message);

  // send back error status
  res.status(err.status || 500).end();
});

module.exports = app;
