const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const { User } = require("./models");

function initializePassport(passport) {
  passport.use(
    new LinkedinStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `http://${process.env.HOSTNAME}:3000/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(async () => {
          try {
            const [user, created] = await User.findOrCreate({
              where: { uid: profile.id },
              defaults: {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[1].value,
                email: profile.emails[0].value,
                accessToken: accessToken
              },
            });
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
  });
}

module.exports = initializePassport;
