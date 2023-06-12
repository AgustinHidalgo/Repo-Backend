import passport from "passport";
import { usersModel } from "../../persistence/mongoDB/models/usersModel.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword } from "../../utils.js"
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import config from "../../config.js";

//estrategia registro
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { firstName, lastName, age, role } = req.body;
      try {
        if (!firstName || !lastName || !age || !role || !email || !password) {
          done(null, false);
        }
        const userDB = await usersModel.findOne({ email });
        if (userDB) {
          done(null, false);
        }
        const hashedPassword = await hashPassword(password);
        const newUser = {
          ...req.body,
          password: hashedPassword,
        };
        const newUserDb = await usersModel.create(newUser);
        done(null, newUserDb);
      } catch (error) {
        done(null, error);
      }
    }
  )
);

//estrategia login

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log(token);
  return token;
};

passport.use(
  "jwtCookies",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.SECRET_KEY_TOKEN,
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});