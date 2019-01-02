let express = require('express')
let router = express.Router()
let Admin = require('./../../models/Admin')

router.get('/', (req, res) => {
  res.render('panel/login/index')
})

router.post('/', (req, res) => {
  Admin.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      console.log(1)
      res.redirect('/panel/login')
    } else if (!user) {
      console.log(2)
      res.redirect('/panel/login')
    } else {
      const bCrypt = require('bcrypt')
      if (bCrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user
        console.log(user)
        res.redirect('/panel')
      } else {
        console.log(3)
        res.redirect('/panel/login')
      }
    }
  })
})

module.exports = router
