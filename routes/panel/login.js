let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  res.render('panel/login/index')
})

module.exports = router
