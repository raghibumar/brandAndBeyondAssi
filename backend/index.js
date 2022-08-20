const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const userRoute = require("./routes/user");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://rag:1234a@clusterraghib.hnb77.mongodb.net/authentication?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongoose is running");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", userRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is Running");
});
