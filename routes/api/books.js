let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let apiHelper = require('./../../helpers/ApiHelper')

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

/**
 *
 * @type {module:mongoose.Model<module:mongoose.Document>|*}
 */
let Book = require('./../../models/Book')

/**
 * @swagger
 * /api/books/:
 *   get:
 *     tags:
 *       - Books
 *     description: Get list of books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: JSON with array of books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Book'
 */
router.get('/', (req, res) => {
  Book.find({}, (err, users) => {
    if (err) return res.status(400).send('There was a problem finding the books.')
    res.status(200).send(users)
  })
})

/**
 * @swagger
 * /api/books/:
 *   post:
 *     tags:
 *       - Books
 *     description: Create book
 *     parameters:
 *       - name: user
 *         description: JSON with book data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book which was created
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Book validation errors
 *         schema:
 *           $ref: '#/definitions/ApiValidation'
 */
router.post('/', (req, res) => {
  Book.create(req.body, (err, user) => {
    if (err) return res.status(400).send({message: 'There was a problem adding the book to the database.', errors: apiHelper.validationErrors(err)})
    res.status(200).send(user)
  })
})

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Get book by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID number
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book object
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem finding the book.')
    if (!book) return res.status(404).send('No book found.')
    res.status(200).send(book)
  })
})

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     description: Create book
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID number
 *         required: true
 *         type: string
 *       - name: book
 *         description: JSON with book data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book which was edited
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
    if (err) return res.status(500).send('There was a problem updating the book.')
    res.status(200).send(book)
  })
})

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     description: Delete book
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID number
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
  Book.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem deleting the book.')
    res.status(200).send('Book ' + book.title + ' was deleted.')
  })
})

module.exports = router
