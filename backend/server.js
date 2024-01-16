const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: ["http://localhost:3000", "PUT WEBSITE LINK HERE"],
      credentials: true,
    })
  );

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//ROUTES MIDDLEWARE
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/contactus", contactRoute);

//ROUTING
app.get("/", (req, res) => {
    res.send("Home Page")
});

//ERROR MIDDLEWARE
app.use(errorHandler);

// CONNECTING TO MONGODB AND STATS SERVER
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port${PORT}`)
        })
    })
    .catch((err) => console.log(err));