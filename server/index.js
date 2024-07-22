const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/user", route);

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
