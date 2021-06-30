const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const { User } = require("./models");

function initializePassport(passport) {
  passport.use(
    new LinkedinStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(async () => {
          //   let user = await User.findOne({
          //     where: {
          //       uid: profile.id,
          //     },
          //   });
          //   if (user) {
          //     return done("User already exists", null);
          //   }
          user = await User.create({
            uid: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[1].value,
            email: profile.emails[0].value,
          });
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("serialize: ", user)
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
  });
}

module.exports = initializePassport;
