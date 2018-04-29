let mongose = require('mongoose')

/**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *       pages:
 *         type: number
 *       year:
 *         type: number
 *       user:
 *         type: string
 *       ebook:
 *         type: boolean
 *       public:
 *         type: boolean
 *
 * @type {module:mongoose.Schema}
 */
let BookSchema = new mongose.Schema({
  title: {
    type: String,
    required: 'Please provide title'
  },
  pages: Number,
  year: Number,
  user: String,
  ebook: {
    type: Boolean,
    required: 'Please select if book is ebook'
  },
  public: Boolean
})
mongose.model('Book', BookSchema)

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>}
 */
module.exports = mongose.model('Book')
