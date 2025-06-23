const express = require('express');
const app = express();
const config = require("config");
const port = config.get("PORT") || 7000;
const cors = require("cors");
const path = require("path");

app.use(cors());


console.log(config.get("Appname"));

// body parser
app.use(express.json());

// import files to display
const error = require("./middleware/error")
const user = require("./routes/user");
const category = require("./routes/category");
const profile = require("./routes/profile");
const book = require("./routes/book");
const auth = require("./routes/auth");

// define main routes
app.use("/user", user);
app.use("/category", category);
app.use("/profile", profile);
app.use("/book", book);
app.use("/auth", auth);
app.use("/public", express.static(path.join(__dirname, "public")))

// app.get("/", (req, res) => {
//     res.send('Hello World!');
// });






app.use(error);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`)
);

