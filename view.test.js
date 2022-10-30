/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const Client = require('./client');
const View = require('./view');

require('jest-fetch-mock').enableMocks();

describe('view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    fetch.resetMocks();
  });

  it('saves api data in JSON file', (done) => {
    const client = new Client();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            name: 'dave',
            id: 123,
          },
        ],
      })
    );
    view = new View(client);
    view.writeJson((jsonData) => {
      expect(jsonData.results[0].name).toEqual('dave');
      done();
    });
  });

  it('loads data from json file', (done) => {
    const client = new Client();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            name: 'dave',
            id: 123,
          },
        ],
      })
    );
    view = new View(client);
    view.writeJson((jsonData) => {
      //   console.log(jsonData);
    });
    view.readData((jsonData) => {
      expect(jsonData.results).toEqual([{ name: 'dave', id: 123 }]);
      done();
    });
  });
});
