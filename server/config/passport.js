import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/usersModel.js";
import * as dotenv from "dotenv"; // dotenv config not loading with middleware ?
dotenv.config();


var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    userModel.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            console.log("error>>>", error);
            return done(err, false);
        }
        if (user) {
        console.log("user in passport >>", user)
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});

const passportConfig = (passport) => {
    passport.use(jwtStrategy);
}
export default passportConfig;