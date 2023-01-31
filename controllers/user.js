const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const data = req.db.get('user');

  setTimeout(() => {
    res.json({ data })
  }, 2000);
});

router.post('/', () => {
  const data = req.db.get('user');

  const updatedData = {
    name: req.body.name || data.name,
    age: req.body.age || data.age,
    avatar: req.body.avatar || data.avatar,
    profession: req.body.profession || data.profession,
  }

  req.db.set('user', updatedData);

  res.json({ data: updatedData})
});

module.exports = router;
