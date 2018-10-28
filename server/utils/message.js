const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().getTime()
});

const generateMessageFromGeolocation = (from, lat, long) => ({
  lat,
  long,
  from,
  url: `https://www.google.com/maps/?q=${lat},${long}`,
  createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateMessageFromGeolocation };
