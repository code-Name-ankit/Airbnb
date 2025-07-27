const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const initDB = async () => {
  await Listing.deleteMany({});
   // initData.data = initData.data.map((obj) => ({...obj, owner: "686d1678106fe0309684133b",  }));
  await Listing.insertMany(initData.data);
  console.log("Database initialized with data");
};
initDB();
