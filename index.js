const fs = require('fs');
const Client = require('./client');
const View = require('./view');

const client = new Client();
const view = new View(client);
