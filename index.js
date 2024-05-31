const express = require("express");
const app = express();
const port = 3456;
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/foodtrucknosqlDB");
  console.log("[DATABASE] Connected to mongodb");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Welcome on the API"));

app.use('/api/foodtrucks', require('./routes/foodtruckRoute'));

app.listen(port, () => console.log(`[SERVER] Listening on port ${port}`));
