let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  res.render('panel/index/index')
})

module.exports = router
