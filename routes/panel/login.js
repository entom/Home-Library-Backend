let express = require('express')
let router = express.Router()
let User = require('./../../models/User')

router.get('/', (req, res) => {
  res.render('panel/login/index')
})

router.post('/', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.redirect('/panel/login')
    } else if (!user) {
      res.redirect('/panel/login')
    } else {

    }
  })
})

module.exports = router
