const express = require('express');
const router = express.Router();
const Map = require('../../models/map')

router.get('/', async (req, res) => {
  try {
    const docs = await Map.find();
    res.send(docs)
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Map.findById(req.params.id);
    res.send(doc)
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body.data;

    if (Array.isArray(data)) {
      const maps = data.map(map => new Map(map));
      Map.collection.insertMany(maps, (err, docs) => {
        if (err) throw err;
        res.send(docs);
      });
    } else {
      const map = new Map(data);
      const doc = await map.save();
      res.send(doc);
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const map = await Map.findById(req.params.id)

    map.name  = req.body.name || map.name;
    map.image = req.body.image || map.image;
    const doc = await map.save();

    res.send(doc);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    Map.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) throw err;
      res.send(docs);
    });
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;