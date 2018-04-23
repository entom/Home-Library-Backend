let express = require('express')
let router = express.Router()

/**
 * @swagger
 * definition:
 *   ApiStatus:
 *     properties:
 *       status:
 *         type: string
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *       - ApiStatus
 *     description: Check status of API
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON with status. It should return "OK" as value for status field
 *         schema:
 *           $ref: '#/definitions/ApiStatus'
 */
router.get('/', (req, res) => {
  res.json({status: 'ok'})
})

module.exports = router
