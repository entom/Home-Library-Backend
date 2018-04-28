let mongose = require('mongoose')

/**
 * @swagger
 * definition:
 *   ApiStatus:
 *     properties:
 *       status:
 *         type: string
 *
 * @type {module:mongoose.Schema}
 */
let ApiStatusSchema = new mongose.Schema({
  status: String
})
mongose.model('ApiStatus', ApiStatusSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('ApiStatus')
