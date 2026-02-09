
const express = require('express');
const path = require('path');
const cors = require('cors');
const bookRoute = require('./node-backend/routes/book.routes');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/books', bookRoute);


// TEST ROUTE
// app.get('/', (req, res) => {
//   console.log('✅ / route hit');
//   res.send('Server is working');
// });

// app.get('/', (req, res) => {
//   res.render('home', {
//     books: [],
//     editingBook: null
//   });
// });

app.get('/', (req, res) => {
  res.redirect('/books');
});

// error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 server is running on port:' + PORT);
});

// app.get('/', async (req, res, next) => {
//   try {
//     const books = await Book.findAll();
//     res.render('home', {
//       books,
//       editingBook: null
//     });
//     console.log("Mai yha hu")
//   } catch (err) {
//     next(err);
//   }
// });
