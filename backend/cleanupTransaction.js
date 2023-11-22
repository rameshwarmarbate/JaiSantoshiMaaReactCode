const mongoose = require("mongoose");
const dbConfig = require("./database/db");

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const db = mongoose.connection.db;
    const collections = await db
      .listCollections({}, { nameOnly: true })
      .toArray();

    if (collections.length) {
      const collectionsNames = collections.map((collection) => collection.name);

      const tables = [
        "cashMemo",
        "transactionPrefix",
        "lorryReceipt",
        "loadingSlip",
        "pettyTransaction",
        "suppliersBill",
        "quotation",
        "bill",
        "moneyTransfer",
      ];

      collectionsNames.forEach(async (collectionName, index) => {
        if (tables.includes(collectionName)) {
          await db.dropCollection(collectionName);
          console.log(`${collectionName} collection dropped`);
        }
        if (collections.length === index + 1) {
          console.log("all the collections are dropped");
          mongoose.connection.close();
          process.exit();
        }
      });
    } else {
      console.log("No collection found");
      mongoose.connection.close();
      process.exit();
    }
  })
  .catch((e) => {
    console.log(e);
  });
