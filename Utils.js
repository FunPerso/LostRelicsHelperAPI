const mergeCollected = (dest, obj) => {
  const keys = Object.keys(obj);

  keys.map(key => {
    if (!dest[key]) dest[key] = 0;

    dest[key] += obj[key];
  })

  return dest;
};

module.exports = { mergeCollected }