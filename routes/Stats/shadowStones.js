const express = require('express');
const router = express.Router();
const Run = require('../../models/run');
const timeHandler = require('../../TimeHandler');

router.get('/', async (req, res) => {
  try {
    console.log(timeHandler.getTodayStart());
    const runs = await Run.find()
      .select('shadowStone map createdAt -_id');
      // .where('createdAt').gte(timeHandler.monthAgoTimestamp);

    let monthValue = {
      runCount: 0,
      runLooted: 0,
      count: 0,
      maps: {}
    };
    let weekValue = {
      runCount: 0,
      runLooted: 0,
      count: 0,
      maps: {}
    };
    let dayValue = {
      runCount: 0,
      runLooted: 0,
      count: 0,
      maps: {}
    };

    runs.map((run) => {
      if (run.createdAt > timeHandler.dayAgoTimestamp) {
        dayValue.count += run.shadowStone;
        if (!dayValue.maps[run.map]) dayValue.maps[run.map] = 0;
        dayValue.maps[run.map] += run.shadowStone;
        dayValue.runCount += 1;
        if (run.shadowStone > 0) dayValue.runLooted += 1;
      } 

      if (run.createdAt > timeHandler.weekAgoTimestamp) {
        weekValue.count += run.shadowStone;
        if (!weekValue.maps[run.map]) weekValue.maps[run.map] = 0;
        weekValue.maps[run.map] += run.shadowStone;
        weekValue.runCount += 1;
        if (run.shadowStone > 0) weekValue.runLooted += 1;
      }

      monthValue.count += run.shadowStone;
      if (!monthValue.maps[run.map]) monthValue.maps[run.map] = 0;
      monthValue.maps[run.map] += run.shadowStone;
      monthValue.runCount += 1;
      if (run.shadowStone > 0) monthValue.runLooted += 1;
    });

    res.send({
      dayValue: dayValue,
      weekValue: weekValue,
      monthValue: monthValue
    });
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;