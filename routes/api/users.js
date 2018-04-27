let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>|*}
 */
let User = require('./../../models/User')

/**
 * @swagger
 * /api/users/:
 *   get:
 *     tags:
 *       - Users
 *     description: Get list of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON with array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send('There was a problem finding the users.')
    res.status(200).send(users)
  })
})

/**
 *
 */
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) return res.status(400).send('There was a problem adding the information to the database.')
    res.status(200).send(user)
  })
})

module.exports = router
