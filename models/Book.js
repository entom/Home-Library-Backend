let mongose = require('mongoose')

/**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *
 * @type {module:mongoose.Schema}
 */
let BookSchema = new mongose.Schema({
  title: String
})
mongose.model('Book', BookSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('Book')
