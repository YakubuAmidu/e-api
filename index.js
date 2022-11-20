const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/*ROUTES*/
const userroute = require('./routes/user');

/*DOTENV-FILE*/
dotenv.config();

/*DATABASE-CONNECTION*/
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successfull...🤗")).catch((err) => console.log(err));

app.use(express.json());

app.use("/api/users", userroute);

/*CONNECTION-PORT*/
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running😁...')
});