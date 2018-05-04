let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

let User = require('./../../models/User')

/**
 * @swagger
 * /api/authenticate/:
 *   post:
 *     tags:
 *       - Authenticate
 *     description: Login user with credentials
 *     summary: Login user
 *     parameters:
 *       - name: user
 *         desciption: User login and password
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object with status and token
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             token:
 *               type: string
 */
router.post('/', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(400).send('Wrong user login')
    } else if (user) {
      if (user.password !== req.body.password) {
        res.status(400).send('Wrong user password')
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        }
        let token = jwt.sign(payload, req.app.get('superSecret'), {
          expiresIn: 60 * 60 * 24
        })

        res.status(200).send({status: 'ok', 'token': token})
      }
    }
  })
})

module.exports = router
