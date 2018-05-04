let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>|*}
 */
let ApiStatus = require('./../../models/ApiStatus')

/**
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *       - ApiStatus
 *     description: Check status of API
 *     summary: Get status of API
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON with status. It should return "OK" as value for status field
 *         schema:
 *           $ref: '#/definitions/ApiStatus'
 */
router.get('/', (req, res) => {
  ApiStatus.findOne({}, (err, status) => {
    if (err) res.status(400).send('There was a problem finding API status')
    if (!status) {
      ApiStatus.create({status: 'ok'}, (err, status) => {
        if (err) res.status(400).send('There was a problem finding API status')
        res.status(200).send(status)
      })
    } else {
      res.status(200).send(status)
    }
  })
})

module.exports = router
