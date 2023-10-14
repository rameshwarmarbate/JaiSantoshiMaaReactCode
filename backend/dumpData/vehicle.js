const mongoose = require("mongoose");
const path = require("path");
const { db } = require("../database/db");
const csv = require("csvtojson");
const Vehicle = require("../models/Vehicle");

mongoose.Promise = global.Promise;

mongoose.set("strictQuery", true);

async function init() {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await Vehicle.deleteMany({});
    console.log("Removed existing Vehicles");
    const filePath = path.resolve(process.cwd(), "dumpData", "vehicle.csv");
    const data = await csv().fromFile(filePath);
    console.log(data.length + " records");
    await Vehicle.insertMany(data, {
      ordered: false,
      silent: true,
    });
    console.log("Finished creating Vehicles");
    mongoose.connection.close();
    console.log("Database connection closed");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

init();
