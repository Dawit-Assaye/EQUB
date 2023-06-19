require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const equberRoutes = require("./routes/equber");
const equbRoutes = require("./routes/equb");
const adminRoutes = require("./routes/admin");
const bankAccountRoutes = require("./routes/bankAccount");

const performEqubTasks = require("./controllers/performEqubTasks");

// const virtualBankDBConnection=require('./connections/virtualDBConnection')

//middleware
// app.use(express.static(__dirname + '/public'));

app.use(express.json()); //to access req.body

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


//routes
app.use("/api/admin", adminRoutes);
app.use("/api/equber", equberRoutes);
app.use("/api/equb", equbRoutes);
app.use("/api/bankAccount", bankAccountRoutes);

// Call the equb tasks function
performEqubTasks();

// Connect to EqubDB and listen on port
const equbDBConnection = mongoose.connect(process.env.MONG_URIEQ, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
equbDBConnection
  .then(() => {
    app.listen(process.env.PORTEQ, () => {
      console.log(
        "Connected to EqubDB and listening on port",
        process.env.PORTEQ
      );
    });
  })
  .catch((error) => {
    console.log("Failed to connect to EqubDB:", error);
  });
