const express = require('express');
const router = express.Router();
const Run = require('../../models/run');
const Item = require('../../models/item');
const timeHandler = require('../../TimeHandler');

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    const runs = await Run.find({ items: parseInt(item._id) })
      .select('map items createdAt -_id');

    let maps = { total: runs.length };
    let monthValue = 0;
    let weekValue = 0;
    let dayValue = 0;
    let totalLooted = 0;

    runs.map(run => {
      const collectedInRun = run.items.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});

      //map summary
      if (!maps[run.map]) maps[run.map] = 0;
      maps[run.map] += collectedInRun[item._id];

      //count summary
      if (run.createdAt > timeHandler.dayAgoTimestamp) dayValue += collectedInRun[item._id];
      if (run.createdAt > timeHandler.weekAgoTimestamp) weekValue += collectedInRun[item._id];
      if (run.createdAt > timeHandler.monthAgoTimestamp) monthValue += collectedInRun[item._id];
      totalLooted += collectedInRun[item._id];
    });

    console.log(runs[0]);
    res.send({
      maps,
      dayValue,
      weekValue,
      monthValue,
      totalLooted,
      collectedInRun,
    })
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;