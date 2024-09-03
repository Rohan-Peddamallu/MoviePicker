import { SessionOptions, CookieOptions } from "express-session";
import 'dotenv/config';
import MongoStore from "connect-mongo";

const CookieConfig: CookieOptions = {
  maxAge: 60 * 60 * 1000,
  secure: process.env.NODE_ENV === 'production',

}

const SessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET! ,
  resave: false,
  saveUninitialized: false,
  cookie: CookieConfig,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONN,  }),
}

export default SessionConfig;