//dotenv
const dotenv = require("dotenv");
dotenv.config();

require("./config/db.js");

const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes.js");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL1, process.env.FRONTEND_URL2],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, () => {
  console.log("-----Server Started-----");
});
