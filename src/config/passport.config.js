import passport from "passport";
import local from "passport-local";
import usersService from "../services/users.service.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";
import google from "passport-google-oauth20";
import passportCustom from "passport-custom";
import envsConfig from "./envs.config.js";
import jwt from "passport-jwt";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import cartsService from "../services/carts.service.js";
import { verifyToken } from "../utils/token.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const CustomStrategy = passportCustom.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          const user = await usersService.getUserByEmail(username);

          if (user) {
            return done(null, false, { message: "User already exists" });
          }

          const cart = await cartsService.createNewCart();

          const newUser = {
            first_name,
            last_name,
            password: hashPassword(password),
            email: username,
            age,
            cart: cart._id,
          };

          const userCreated = await usersService.createNewUser(newUser);

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await usersService.getUserByEmail(username);

          if (!user || !isValidPassword(password, user.password)) {
            return done(null, false, { message: "Invalid credentials" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Estrategia de Google
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: envsConfig.GOOGLE_CLIENT_ID,
        clientSecret: envsConfig.GOOGLE_CLIENT_ID,
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { id, name, emails } = profile;

          const user = await usersService.getUserByEmail(emails[0].value);

          if (user) {
            return cb(null, user);
          }
          const newUser = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const userCreated = await usersService.createNewUser(newUser);

          return cb(null, userCreated);
        } catch (error) {}
      }
    )
  );

  // Estrategia de JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envsConfig.JWT_SECRET_CODE,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new CustomStrategy(async (req, done) => {
      try {
        const token = cookieExtractor(req);

        if (!token) {
          return done(null, false);
        }

        const tokenVerify = verifyToken(token);
        if (!tokenVerify) {
          return done(null, false);
        }

        const user = await usersService.getUserByEmail(tokenVerify.email);

        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  /*
  Serializacion y Deserializacion de usuarios.
  La serializacion y deserializacion de usuarios es un proceso que nos permite almacenar y recuperar informacion del usuario en la sesion.
  la serializacion es un proceso de convertir un objeto de usuario en un identificador unico.
  la deserializacion es el proceso de recuperar un objeto de usuario a partir de un identificador unico.
  los datos del usuer se almacenan en la sesion y se recuperan en cada peticion. 
   */

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
