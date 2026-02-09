//creating routes

const express = require('express');
const bookRoute = express.Router();

let Book = require('../model/book')

// bookRoute.get('/', (req, res) => {
//   res.send('Books route working');
// });

// bookRoute.post('/add', (req, res) => {
//   res.send('Add book');
// });

// bookRoute.get('/', async (req, res, next) => {
//   try {
//     const filter = req.query.filter || 'all';

//     // TEMP: no DB yet
//     let books = [];

//     // later you can do:
//     // if (filter === 'read') ...
//     // if (filter === 'unread') ...

//     res.render('home', {
//       books,
//       editingBook: null
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// GET /books
bookRoute.get('/', async (req, res, next) => {
  try {
    const filter = req.query.filter || 'all';

    const books = await Book.findAll(filter);

    res.render('home', {
      books,
      editingBook: null
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// POST /books/add
bookRoute.post('/add', async (req, res, next) => {
  try {
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      status: req.body.status
    });

    res.redirect('/books');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// bookRoute.get('/', async (req, res, next) => {
//   console.log('➡️ /books route hit');

//   // TEMP: skip DB
//   return res.render('home', {
//     books: [],
//     editingBook: null
//   });
// });


// //add a book 
// bookRoute.post('/', async (req, res, next) => {
//   try {
//     const book = await Book.create(req.body);
//     res.status(201).json(book);
//   } catch (err) {
//     next(err);
//   }
// });

// // Get all books
// bookRoute.get('/', async (req, res, next) => {
//   try {
//      const books = await Book.findAll();
//     //console.log('✅ / aaja paaji');
//      res.json(books);
//   } catch (err) {
//     next(err);
//   }
// });

// // Get book by title
// bookRoute.get('/title/:title', async (req, res, next) => {
//   try {
//     const book = await Book.findByTitle(req.params.title);
//     if (!book) return res.status(404).json({ message: 'Not found' });
//     res.json(book);
//   } catch (err) {
//     next(err);
//   }
// });

// Update status
// bookRoute.put('/:id', async (req, res, next) => {
//   try {
//     const updated = await Book.updateStatus(req.params.id, req.body.status);
//     if (!updated) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
//     res.json({ message: 'Status updated successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// Delete
// bookRoute.delete('/:id', async (req, res, next) => {
//   try {
//     await Book.destroy(req.params.id);
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

//exporting the module
module.exports = bookRoute;