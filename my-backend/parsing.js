const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.meloman.kz/press/top-50-delovoi-literaturi.html?from=knigisis';
const book_data = [];

async function getData() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const books = $(".product-item-info");
        books.each(function() {
            const price = $(this).find('.price').text().trim();
            const info = $(this).find('.product-item-link').text().trim();
            const id = $(this).attr('data-product-id');
            let img = $(this).find('img.product-image-photo').attr('src');
            if (!img) {
                img = $(this).find('img.product-image-photo').attr('data-src');
            }
            book_data.push({ price, info, img, id });
        });

        // console.log(book_data);
        return book_data
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        return [];
    }
}

// getData();
module.exports = { getData };