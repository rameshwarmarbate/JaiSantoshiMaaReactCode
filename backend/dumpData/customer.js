const mongoose = require("mongoose");
const path = require("path");
const { db } = require("../database/db");
const csv = require("csvtojson");
const Customer = require("../models/Customer");

mongoose.Promise = global.Promise;

mongoose.set("strictQuery", true);

async function init() {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await Customer.deleteMany({});
    console.log("Removed existing Customers");
    const filePath = path.resolve(process.cwd(), "dumpData", "customer.csv");
    const data = await csv().fromFile(filePath);
    console.log(data.length + " records");
    await Customer.insertMany(data);
    console.log("Finished creating customers");
    mongoose.connection.close();
    console.log("Database connection closed");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

init();
