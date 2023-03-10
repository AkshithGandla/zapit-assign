const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  //check if the rqst is a GET request
  if (req.method === "GET") {
    console.log("Cannot cache a non GET rqst");
    return next();
  }

  //checking for key i cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log("Cache found for key: " + key);
    res.json(cachedResponse);
  } else {
    console.log("Cache not found for key: " + key);
    res.originalJson = res.json;
    res.send = (body) => {
      res.originalJson(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
