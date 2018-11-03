let express = require('express')
let router = express.Router()
let panelSessionChecker = require('../../helpers/panelSessionChecker')

router.get('/', panelSessionChecker, (req, res) => {
  res.render('panel/index/index')
})

module.exports = router
