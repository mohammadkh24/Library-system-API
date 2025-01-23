const express = require("express");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser")
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const categoriesRouter = require("./routes/categories");

const app = express();

// Set Public
app.use(
    "/books/covers",
    express.static(path.join(__dirname, "public" , "books" , "covers"))
  );

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth" , authRouter);
app.use("/api/users" , usersRouter);
app.use("/api/books" , booksRouter)
app.use("/api/categories" , categoriesRouter)

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