const fs = require("node:fs/promises");

async function getCredentials() {
  const credentials = await fs.readFile('store/credentials.json', 'utf8');

  return JSON.parse(credentials);
}

exports.getCredentials = getCredentials;
