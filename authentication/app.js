require("dotenv").config();
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

//body parser middleware
// const { urlencoded } = require("express");
// app.use(express.json());
// app.use(urlencoded({ extended: true }));
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static("public"));

const routes = require("./api/index");


app.get("/", (req, res, next) => {
  res.status(200).send("API is working!");
});

app.use("/api", routes);

// app.use("/*", (req, res) => {
//   res
//     .status(404)
//     .send(
//       `<br><br><h1 style="text-align: center;">404 || content not found</h1>`
//     );
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server started on port " + port));
