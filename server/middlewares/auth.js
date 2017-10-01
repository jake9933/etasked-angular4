const knex = require('../knex');

module.exports = (req, res, next) => {
  if (!req.session.id)
    return next();

  knex('sessions').where('session_id', req.session.id).first().then(session => {
    console.log(session);
    if (!session)
      return next();
    knex('users').where('id', session.user_id).first().then(user => {
      console.log(user);
      if (!user)
        return next();
      req.user = user;
      return next();
    })
  })
}