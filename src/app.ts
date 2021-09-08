import * as dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGO_URI || "");

const app = express();

app.use(express.static("public"));

app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "uploads", "posts"))
);

app.use(cors({ origin: "*" }));
routes(app);

app.get("/", (req, res) => {
  res.json("GloboSP API");
});

const port = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log("-----------------------------------------------------");
  console.log(` Servidor ativo com sucesso em: http://localhost:${port}`);
  console.log("-----------------------------------------------------");
});
