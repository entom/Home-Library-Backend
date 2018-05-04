let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

let User = require('./../../models/User')

router.post('/', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(400).send('Wrong user login')
    } else if (user) {
      if (user.password !== req.body.password) {
        res.status(400).send('Wrong user password')
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        }
        let token = jwt.sign(payload, req.app.get('superSecret'), {
          expiresIn: 60 * 60 * 24
        })

        res.status(200).send({status: 'ok', 'token': token})
      }
    }
  })
})

module.exports = router
