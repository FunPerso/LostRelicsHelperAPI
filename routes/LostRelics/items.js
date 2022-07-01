const express = require('express');
const router = express.Router();
const Item = require('../../models/item')

router.get('/', async (req, res) => {
  try {
    const docs = await Item.find();
    res.send(docs)
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Item.findById(req.params.id);
    res.send(doc)
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body.data;

    if (Array.isArray(data)) {
      const items = data.map(item => new Item(item));
      Item.collection.insertMany(items, (err, docs) => {
        if (err) throw err;
        res.send(docs);
      });
    } else {
      const item = new Item(data);
      const doc = await item.save();
      res.send(doc);
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    item.name  = req.body.name || item.name;
    item.image = req.body.image || item.image;
    const doc = await item.save();

    res.send(doc);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    Item.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) throw err;
      res.send(docs);
    });
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;