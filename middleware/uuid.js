const uuid = require('uuid');

exports.generateUUID = () => {
  return uuid.v4();
}
