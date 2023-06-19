const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors())

const data = {
  mobile: [
    {
      id: 1,
      name: 'گوشی iphone 13',
      price: '40'
    },
    {
      id: 2,
      name: 'گوشی A12',
      price: '12'
    },
  ],
  laptop: [
    {
      id: 1,
      name: 'لپ تاپ asus rog',
      price: '60'
    },
    {
      id: 2,
      name: 'لپ تاپ asus tuf',
      price: '40'
    },
  ]
}

app.get('/categories', (req, res) => {
  res.json(data)
});

app.get('/categories/:name', (req, res) => {
  res.json(data[req.params.name]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})