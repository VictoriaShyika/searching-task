/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const express = require('express');
const cors = require('cors')

const data      = require('./data');

const app = express();
const hostname  = 'localhost';
const port = 3035;

app.use(cors())


app.get('/search', (req, res) => {
  

    const query = req.query.q.toLowerCase();
    if (query == "") {
          return []
    }
    
    function search(query) {
        const result = [];
        
        data.map((item) => {
            const words = item.name.split(' ');
            const tags = item.tags;

            words.map((word) => {
                if (word.toLowerCase().startsWith(query)) {
                    result.push(item);
                }
            });
            
            tags.map((tag) => {
                if (tag.toLowerCase().startsWith(query)) {
                    result.push(item);
                }
            });
        });
        
        return  Array.from(new Set(result));
}

  
  res.json(search(query));
});

app.listen(port, () => {
  console.log(`[Server running on ${hostname}:${port}]`);
});

