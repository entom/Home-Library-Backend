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
 *       role:
 *         type: string
 *
 * @type {module:mongoose.Schema}
 */
let UserSchema = new mongose.Schema({
  name: {
    type: String,
    required: 'Please provide name'
  },
  email: {
    type: String,
    required: 'Please provide email'
  },
  password: {
    type: String,
    required: 'Please provide password'
  },
  role: String
})
mongose.model('User', UserSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('User')
