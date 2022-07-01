const express = require('express');
const router = express.Router();
const Run = require('../../models/run')

const day = 3600 * 24;
const week = day * 7;
const month = day * 30;

router.get('/', async (req, res) => {
  try {
    const docs = await Run.find();
    res.send(docs)
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body.data;

    if (Array.isArray(data)) {
      const runs = data.map(run => {
        const newRun = new Run(run);
        newRun.createdAt = Math.floor(Date.now() / 1000);
        return newRun;
      });
      Run.collection.insertMany(runs, (err, docs) => {
        if (err) throw err;
        res.send(docs);
      });
    } else {
      const run = new Run(data);
      run.createdAt = Math.floor(Date.now() / 1000);
      const doc = await run.save();
      res.send(doc);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const run = await Run.findById(req.params.id)

//     run.wasSuccessful = req.body.wasSuccessful || run.wasSuccessful;
//     run.map = req.body.map || run.map;
//     run.gold = req.body.gold || run.gold;
//     run.exp = req.body.exp || run.exp;
//     run.shadowStone = req.body.shadowStone || run.shadowStone;
//     run.duration = req.body.duration || run.duration;
//     run.items = req.body.items || run.items;

//     const doc = await run.save();
//     res.send(doc);
//   } catch (err) {
//     res.status(400).send('Error: ' + err);
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    Run.findByIdAndDelete(req.params.id, (err, docs) => {
      if (err) throw err;
      res.send(docs);
    });
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;