if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const initializePassport = require("./passport-config");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({extended:false}));

initializePassport(passport);

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./db-config').sync()

app.get("/user", (req, res) => {
  const user = req.user
  res.json(user);
});

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "Some state" }),
  (req, res) => {}
);

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/user",
    failureRedirect: "/login",
  })
);

app.listen(3000);
