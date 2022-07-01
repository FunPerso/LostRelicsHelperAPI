const day = 3600 * 24
const week = day * 7;
const month = day * 30;

const now = Math.floor(Date.now() / 1000);
const getTodayStart = () => {
  let d = new Date();
  d.setHours(1,0,0,0);
  return Math.floor(Date.parse(d) / 1000);
}
const dayAgoTimestamp = Math.floor(Date.now() / 1000) - day;
const weekAgoTimestamp = Math.floor(Date.now() / 1000) - week;
const monthAgoTimestamp = Math.floor(Date.now() / 1000) - month;

module.exports = {
  getTodayStart,
  now,
  dayAgoTimestamp,
  weekAgoTimestamp,
  monthAgoTimestamp
};