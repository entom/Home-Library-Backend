let mongose = require('mongoose')

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 * @type {module:mongoose.Schema}
 */
let UserSchema = new mongose.Schema({
  name: String,
  email: String,
  password: String
})
mongose.model('User', UserSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('User')
