const moment = require("moment");

const generateMessage = (from, text) => {
  const timeStamp = moment();
  return {
    from,
    text,
    createdAt: timeStamp.valueOf(),
    formattedTime: timeStamp.format("h:mm a")
  };
};

const generateMessageFromGeolocation = (from, lat, long) => {
  const timeStamp = moment();
  return {
    lat,
    long,
    from,
    url: `https://www.google.com/maps/?q=${lat},${long}`,
    createdAt: timeStamp.valueOf(),
    formattedTime: timeStamp.format("h:mm a")
  };
};

module.exports = { generateMessage, generateMessageFromGeolocation };
