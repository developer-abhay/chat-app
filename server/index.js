const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api/v1/user", route);

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
