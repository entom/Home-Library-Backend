let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let apiHelper = require('./../../helpers/ApiHelper')
let VerifyToken = require('./../../helpers/VerifyToken')

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
 *     summary: List of books
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
router.get('/', VerifyToken, (req, res) => {
  Book.find({}, (err, books) => {
    if (err) return res.status(400).send('There was a problem finding the books.')
    res.status(200).send(books)
  })
})

/**
 * @swagger
 * /api/books/:
 *   post:
 *     tags:
 *       - Books
 *     description: Create a book
 *     summary: Create a book
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
router.post('/', VerifyToken, (req, res) => {
  if (req.body.images !== undefined && req.body.images.coverFront !== undefined && req.body.images.coverFront.length > 0) {
    let filename = req.decoded.id + '-' + (new Date()).getTime()
    apiHelper.uploadFile(filename, 'books/coverFront', req.body.images.coverFront)
    req.body.images.coverFront = filename
  }

  if (req.body.images !== undefined && req.body.images.coverBack !== undefined && req.body.images.coverBack.length > 0) {
    let filename = req.decoded.id + '-' + (new Date()).getTime()
    apiHelper.uploadFile(filename, 'books/coverBack', req.body.images.coverBack)
    req.body.images.coverBack = filename
  }

  if (req.body.images !== undefined && req.body.images.other !== undefined && req.body.images.other.length > 0) {
    let filename = req.decoded.id + '-' + (new Date()).getTime()
    apiHelper.uploadFile(filename, 'books/other', req.body.images.other)
    req.body.images.other = filename
  }

  Book.create(req.body, (err, book) => {
    if (err) {
      return res.status(400).send({
        message: 'There was a problem adding the book to the database.',
        errors: apiHelper.validationErrors(err)
      })
    }
    res.status(200).send(book)
  })
})

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Get book by id
 *     summary: Get book by id
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
router.get('/:id', VerifyToken, (req, res) => {
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
 *     description: Update a book
 *     summary: Update a book
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
router.put('/:id', VerifyToken, (req, res) => {
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
 *     description: Delete a book
 *     summary: Delete a book
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
router.delete('/:id', VerifyToken, function (req, res) {
  Book.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) return res.status(500).send('There was a problem deleting the book.')
    res.status(200).send('Book ' + book.title + ' was deleted.')
  })
})

module.exports = router
