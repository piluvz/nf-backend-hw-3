const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const cron = require('node-cron');
const { getData } = require('./parsing');

const app = express();
const port = 5000;
app.use(cors());

const fetchAndUpdateData = async () => {
    try {
      const newData = await getData();
      book_data = newData;
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
};

fetchAndUpdateData();
// data fetch every day at midnight (0:0)
cron.schedule('0 0 * * *', fetchAndUpdateData);

app.get('/api/books', async (req, res) => {
    res.json(book_data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
