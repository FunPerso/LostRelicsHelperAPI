const express = require('express');
const router = express.Router();
const Run = require('../../models/run');
const timeHandler = require('../../TimeHandler');

router.get('/', async (req, res) => {
  try {
    console.log(timeHandler.getTodayStart());
    const shadowStones = await Run.find()
      .select('shadowStone createdAt -_id')
      .where('createdAt').gte(timeHandler.monthAgoTimestamp);

    let monthValue = 0;
    let weekValue = 0;
    let dayValue = 0;
    const perDay = {};

    shadowStones.map((ssObject) => {
      if (ssObject.createdAt > timeHandler.dayAgoTimestamp) dayValue += ssObject.shadowStone;
      if (ssObject.createdAt > timeHandler.weekAgoTimestamp) weekValue += ssObject.shadowStone;
      monthValue += ssObject.shadowStone;
    });

    res.send({
      dayValue: dayValue,
      weekValue: weekValue,
      monthValue: monthValue
    });
  } catch (err) {

  }
});

module.exports = router;