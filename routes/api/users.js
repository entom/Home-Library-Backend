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
 * @swagger
 * /api/users/:
 *   post:
 *     tags:
 *       - Users
 *     description: Create user
 *     parameters:
 *       - name: user
 *         description: JSON with user data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User which was created
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    if (err) return res.status(400).send('There was a problem adding the information to the database.')
    res.status(200).send(user)
  }).then(() => {})
})

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID number
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User object
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.')
    if (!user) return res.status(404).send('No user found.')
    res.status(200).send(user)
  })
})

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Create user
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID number
 *         required: true
 *         type: string
 *       - name: user
 *         description: JSON with user data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User which was edited
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if (err) return res.status(500).send('There was a problem updating the user.')
    res.status(200).send(user)
  })
})

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete user
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID number
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Message
 *         type: string
 */
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send('There was a problem deleting the user.')
    res.status(200).send('User ' + user.name + ' was deleted.')
  })
})

module.exports = router
