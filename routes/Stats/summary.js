const express = require('express');
const router = express.Router();
const Run = require('../../models/run');
const Item = require('../../models/item');
const timeHandler = require('../../TimeHandler');
const Utils = require('../../SummaryUtils');

router.get('/', async (req, res) => {
  try {
    const runs = await Run.find()
      .select('wasSuccessful map items createdAt shadowStone -_id')
      .where('createdAt').gte(timeHandler.monthAgoTimestamp);

    const maps = {};
    const bestSSDropToday = {
      map: "",
      count: 0
    }
    let SSLooted = 0;
    let BCLooted = 0;
    let timeSpendInAdventure = 0;
    let successfulCount = 0;
    let failedCount = 0;

    runs.map(run => {
      if (!maps[run.map]) maps[run.map] = 0;
      maps[run.map] += 1;

      if (run.shadowStone > bestSSDropToday.count) {
        bestSSDropToday.map = run.map
        bestSSDropToday.count = run.shadowStone;
      }
      SSLooted += run.shadowStone;
      run.items.map(item => BCLooted += (Utils.itemIsBC(item) ? 1 : 0));

      if (run.wasSuccessful) successfulCount += 1;
      else failedCount += 1;
    });


    res.send({
      maps,
      bestSSDropToday,
      mostPlayedMap: Utils.getMostPlayedMap(maps),
      SSLooted,
      BCLooted,
      timeSpendInAdventure,
      successfulCount,
      failedCount
    })
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;