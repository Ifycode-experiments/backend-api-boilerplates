const { success } = require('../../lib/consolemsg');

async function getAppController (req, res) {
  const message = 'App works!';
  success(message);
  return res.status(200).json({ message });
}

module.exports = { getAppController };
