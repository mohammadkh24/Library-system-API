const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const usersRouter = require("./routes/user")

const app = express();

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth" , usersRouter);

// Not Found Page
app.use((req,res) => {
    return res.status(404).json({
        error : {
            type : "not found",
            message : "Page not found"
        }
    })
})

module.exports = app