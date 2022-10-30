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

  it('Appends data a displays on web page', (done) => {
    const client = new Client();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            sectionId: 'football',
            webUrl:
              'https://www.theguardian.com/football/live/2022/oct/30/manchester-united-v-west-ham-premier-league-live',
            thumbnail:
              'https://media.guim.co.uk/c830d2213e26796529be13fd58aa2b82bbba53d9/272_840_7842_4705/500.jpg',
          },
          {
            sectionId: 'world',
            webUrl:
              'https://www.theguardian.com/world/live/2022/oct/30/russia-ukraine-war-live-us-accuses-russia-of-weaponising-food-after-moscow-suspends-grain-deal',
            thumbnail:
              'https://media.guim.co.uk/92358bf7ccc616f10ba753cc998b34a4b9a1ae5a/0_267_4000_2400/500.jpg',
          },
        ],
      })
    );
    view = new View(client);
    view.writeJson((jsonData) => {});
    view.readData((jsonData) => {});
    // view.readData((jsonData) => {
    //   console.log(jsonData);
    //   expect(document.querySelectorAll('div.story').length).toEqual(2);
    //   done();
    // });
    expect(view.display().length).toEqual(2);
    //   expect(document.querySelectorAll('div.story').length).toEqual(2);
    done();
  });
});
