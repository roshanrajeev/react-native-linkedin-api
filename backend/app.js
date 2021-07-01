if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const initializePassport = require("./passport-config");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const querystring = require('querystring')

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
    cookie: {
      secure: false,
      maxAge: 3600000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./db-config").sync();

// const isAuthenticated = (req, res, next) => {
//   if(req.isAuthenticated()){
//     return next()
//   }
// }


app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "Some state" })
);

let successRedirect
if (process.env.HOSTNAME === 'localhost') {
  successRedirect = '/user'
} else {
  successRedirect = "/auth/linkedin/redirect"
}

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: successRedirect,
    // successRedirect: "/user",
    failureRedirect: "/login",
  })
);

app.get("/auth/linkedin/redirect", (req, res) => {
  const user = req.user
  delete user.createdAt
  delete user.updatedAt
  const str = querystring.stringify(req.user)
  res.redirect(`exp://192.168.100.5:19000?${str}`);
});


app.get("/user", (req, res) => {
  if(!req.isAuthenticated()){
    return res.json({"error": "unauthorized"})
  }
  res.json(user);
});

app.listen(3000);
