const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local')

const User = require('../models/user')
const config = require('../config')

const localOptions = {
    usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOptions, function (email, password, done) {
    // look for the user we want to login with
    User.findOne({ email: email }, function (error, user) {
        if (error) { return done(error) }   // if error, return done
        if (!user) { return done(null, false) } // if user not found, return done but with no user
        user.comparePassword(password, function (error, isMatch) {
            if (error) { return done(error) }
            if (!isMatch) { return done(null, false) }
            return done(null, user);    // if user is found, return user info
        })
    })
})

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (error, user) {
        if (error) { return done(error, false) }
        if (user) {
            done(null, user)
        }
        else {
            done(null, false)
        }
    })
})

passport.use(localStrategy)
passport.use(jwtStrategy)