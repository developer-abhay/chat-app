const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/user", route);

const port = 3001;

app.listen(port, () => {
  console.log("server is listening");
});
