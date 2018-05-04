let jwt = require('jsonwebtoken')

function verifyToken (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.status(403).send({message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({message: 'No token provided.'})
  }
}

module.exports = verifyToken
