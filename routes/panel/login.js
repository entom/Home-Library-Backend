let express = require('express')
let router = express.Router()
let Admin = require('./../../models/Admin')

router.get('/', (req, res) => {
  res.render('panel/login/index')
})

router.post('/', (req, res) => {
  Admin.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.redirect('/panel/login')
    } else if (!user) {
      res.redirect('/panel/login')
    } else {
      const bCrypt = require('bcrypt')
      if (bCrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user
        req.cookies.user = user
        console.log(user)
        res.redirect('/panel')
      } else {
        res.redirect('/panel/login')
      }
    }
  })
})

module.exports = router
