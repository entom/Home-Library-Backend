let express = require('express')
let router = express.Router()
let panelSessionChecker = require('../../helpers/panelSessionChecker')

router.get('/', panelSessionChecker, (req, res) => {
  res.render('panel/index/index')
})

router.get('/logout', panelSessionChecker, (req, res) => {
  req.session.destroy()
  res.redirect('/panel/login')
})

module.exports = router
