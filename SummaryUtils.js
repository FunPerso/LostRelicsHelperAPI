const getMostPlayedMap = (mapRecords) => {
  const keys = Object.keys(mapRecords);
  const highestRecord = {
    map: "",
    count: 0,
  };

  keys.map(key => {
    const count = mapRecords[key];

    if (count > highestRecord.count) {
      highestRecord.map = key;
      highestRecord.count = count;
    }
  });

  return highestRecord;
};

const itemIsBC = (itemId) => {
  const BCList = [3, 5];
  
  return BCList.includes(itemId);
}

module.exports = {
  getMostPlayedMap,
  itemIsBC,
};