require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const axios = require("axios");

const verifyUser = require("./middlewares/verifyUser");
const verifyAdmin = require("./middlewares/verifyAdmin");

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));




app.use("/", verifyUser, async (req, res, next) => {
  if (!req.body.userID || !req.body.emailVerified) {
    try {
      const response = await axios({
        method: req.method,
        url: `http://185.208.207.55:3000${req.url}`,
        data: req.body,
        config: { headers: req.headers },
      });
      // console.log(response.data);
      res.set(response.headers);
      res.send(response.data);
    } catch (error) {
      res.send(error);
    }
  } else {
    console.log(req.headers.auth);
    console.log("working route -->");
    require("./routes/cms");
  }
});




app.use("/*", (req, res) => {
  res
    .status(404)
    .send(
      `<br><br><h1 style="text-align: center;">404 || content not found</h1>`
    );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
