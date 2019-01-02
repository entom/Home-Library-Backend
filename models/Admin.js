let mongose = require('mongoose')

/**
 * @swagger
 * definition:
 *   Admin:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 * @type {module:mongoose.Schema}
 */
let AdminSchema = new mongose.Schema({
  email: {
    type: String,
    required: 'Please provide email'
  },
  password: {
    type: String,
    required: 'Please provide password'
  }
})
mongose.model('Admin', AdminSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('Admin')
