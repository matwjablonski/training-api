const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const data = req.db.get('transfers');

  setTimeout(() => {
    res.json({ data: [...data], total: data.length })
  }, 2000);
});

router.get('/:id', (req, res) => {
  const data = req.db.get('transfers');
  const item = data.find(element => element.id.toString() === req.params.id);
  res.json({ data: item })
});

router.get('/search/:title', (req, res) => {
  const data = req.db.get('transfers');
  const filtered = data.filter(t => t.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json({ data: [ ...filtered ] })
});

router.get('/search/:minValue/:maxValue', (req, res) => {
  const data = req.db.get('transfers');

  const min = parseInt(req.params.minValue, 10);
  const max = parseInt(req.params.maxValue, 10);

  const filtered = data.filter(t => t.value >= min && t.value <= max);
  res.json({ data: [ ...filtered ] })
});

router.post('/', (req, res) => {
  const data = req.db.get('transfers');
  const id = Math.floor(Math.random() * 10000);

  const updatedData = [ 
    ...data, 
    { 
      id,
      title: req.body.title,
      transactionType: req.body.transactionType,
      date: req.body.date,
      currency: req.body.currency,
      value: parseInt(req.body.value, 10),
    }
  ]

  req.db.set('transfers', updatedData);

  res.json({ data: updatedData})
});

module.exports = router;
