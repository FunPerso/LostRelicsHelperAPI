const express = require('express');
const router = express.Router();
const Run = require('../../models/run');
const Item = require('../../models/item');
const timeHandler = require('../../TimeHandler');
const Utils = require('../../Utils');

router.get('/:map', async (req, res) => {
  try {
    const runs = await Run.find({ map: req.params.map })
      .select('map items shadowStone createdAt -_id')

    // let maps = { total: runs.length };
    let monthValue = {
      count: 0,
      collected: {}
    };
    let weekValue = {
      count: 0,
      collected: {}
    };
    let dayValue = {
      count: 0,
      collected: {}
    };
    let totalRuns = runs.length;
    // const collectedInRun = {};

    runs.map(run => {

      const collectedInRun = run.items.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});

      //count summary
      if (run.createdAt > timeHandler.dayAgoTimestamp) {
        dayValue.count += 1;
        dayValue.collected = Utils.mergeCollected(dayValue.collected, collectedInRun);
      }
      if (run.createdAt > timeHandler.weekAgoTimestamp) {
        weekValue.count += 1;
        weekValue.collected = Utils.mergeCollected(weekValue.collected, collectedInRun);
      }
      if (run.createdAt > timeHandler.monthAgoTimestamp) {
        monthValue.count += 1;
        monthValue .collected = Utils.mergeCollected(monthValue.collected, collectedInRun);
      } 

    });

    console.log(runs);
    res.send({
      dayValue,
      weekValue,
      monthValue,
      totalRuns,
    })
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;