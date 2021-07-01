if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const initializePassport = require("./passport-config");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(cors(
  {
    origin: "*",
    credentials: true
  }
))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

initializePassport(passport);

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./db-config").sync();

const isAuthenticated = (req, res, next) => {
  // if(req.)
}

app.get("/user", (req, res) => {
  console.log(req.cookies)
  console.log(req.isAuthenticated())
  console.log(req.session)
  const user = req.user;
  console.log(user);
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
    successRedirect: "/auth/linkedin/redirect",
    // successRedirect: "/user",
    failureRedirect: "/login",
  })
);

app.get("/auth/linkedin/redirect", (req, res) => {
  res.redirect("exp://192.168.100.39:19000");
});


app.listen(3000);
