const express = require("express");
const config = require("./config/database");
const mongoose = require("mongoose");
const dbHelper = require('./helpers/dbHelper').dbHelper

const currencyRouter = require('./routes/currency');

const CronJob = require('cron').CronJob;

dbHelper.checkDb()

const job = new CronJob('00 00 16 * * *',async function(){
  console.log('Running the cron job to get new data from the Central Bank')
  await dbHelper.removeCurrencyTable()
  await dbHelper.checkDb()
},null, true,'Europe/Berlin');

const app = express();
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/currencies", currencyRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listing to port ${PORT}`);
});
