
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  // host: 'localhost',
  // user: 'root', // Replace with your MySQL username
  // password: '', // Replace with your MySQL password
  // database: 'banner_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

let bannerData = {
  isVisible: true,
  description: 'Special Offer!',
  timer: 10,
  link: '#',
};


app.get('/api/banner', (req, res) => {
  console.log('GET /api/banner request received');
  connection.query('SELECT * FROM banners WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Error fetching banner data:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Banner not found');
    }
    res.json(results[0]);
  });
});

// app.get('/api/banner', (req, res) => {
//   console.log('GET /api/banner request received');
//   res.json(bannerData);
// });


//POST endpoint to update banner data
app.post('/api/banner', (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  connection.query(
    'UPDATE banners SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1',
    [description, timer, link, isVisible],
    (err, results) => {
      if (err) {
        console.error('Error updating banner data:', err);
        return res.status(500).send('Server error');
      }
      res.json({ description, timer, link, isVisible });
    }
  );
});

app.post('/api/banner', (req, res) => {
  const { isVisible, description, timer, link } = req.body;
  bannerData = { isVisible, description, timer, link };
  res.json(bannerData);
});

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));