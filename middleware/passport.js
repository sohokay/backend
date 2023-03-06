import passport  from 'passport'
import User  from '../Module/User/User.model'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../const'
import {Strategy} from 'passport-http-bearer'

passport.use(new Strategy(async function (accessToken, done) {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const user = await User.findById(decoded._id)
    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return done(null, false, {message: 'Token expired'});
    } else {
      return done(err, false);
    }
  }
}));

// 身份验证中间件
export const authenticate = function (req, res, next) {
  passport.authenticate('bearer', {session: false}, (err, user, info) => {
    if (err) {
      return next('err', err);
    }
    if (!user) {
      let message = '未授权';
      if (info.error === 'invalid_token' && info.error_description === 'Token expired') {
        message = 'token过期'
      }
      return next(message);
    }
    req.user = user;
    next();
  })(req, res, next)
}

