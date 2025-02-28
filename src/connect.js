// https://github.com/wit-hdip-comp-sci-2023/full-stack-1/blob/main/prj/playtime/playtime-0.5.0/src/models/mongo/connect.js
import * as dotenv from "dotenv";
import Mongoose from "mongoose";

dotenv.config();


export function connectMongo() {

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}