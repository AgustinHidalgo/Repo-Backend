import passport from "passport";
import { usersModel } from "../dao/models/usersModel.js";
import { Strategy as GithubStrategy } from "passport-github2";
import {ExtractJwt, Strategy as jwtStrategy} from 'passport-jwt';

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.3e62bc0d3eeef1fd",
      clientSecret: "d2df80ee591b4701954f3f4723af020dbaa4fb90",
      callbackURL: "http://localhost:8080/users/github",
    },
    async(accessToken, refreshToken, profile, done) => {
      const user = await usersModel.findOne({email:profile._json.email})
      if(!user){
        const newUser = {
            firstName:profile._json.name.split(' ')[0],
            lastname:profile._json.name.split(' ')[1] || ' ',
            email:profile._json.email,
            password:' ',
        }
        const userDB = await usersModel.create(newUser)
        done(null,userDB)
      }else{
        done(null,user)
      }
    }
  )
);

passport.use(
  'jwt', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretToken'
  },async (jwt_payload, done) => {
    done(null, jwt_payload.user)
  })
)

/* 
passport.use(
  "registro",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "passsword",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await usersModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashedPassword = await hashPassword(password);
      const newUser = {
        ...req.body,
        password: hashedPassword,
      };
      const newUserDB = await usersModel.create(newUser);
      done(null, newUserDB);
    }
  )
); */

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersModel.findById(id);
  done(null, user);
});