var express = require('express');
var router = express.Router();

/**
 * @swagger
 * definition:
 *   Index:
 *     properties:
 *       status:
 *         type: string
 * @swagger
 * /api/index:
 *   get:
 *     description: Check status of API
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON with status
 *         schema:
 *           $ref: '#/definitions/Index'
 */
router.get('/', function (req, res, next) {
    res.json({status: 'ok'});
});

module.exports = router;
