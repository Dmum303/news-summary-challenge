const fs = require('fs');
const Client = require('./client');

class View {
  constructor(client) {
    this.client = client;
    this.store = [];
  }

  //deletes the json file, noot sure if the data writes over - but just in case
  wipe() {
    const fs = require('fs');
    const filePath = 'news.json';
    fs.access(filePath, (error) => {
      if (!error) {
        fs.unlink(filePath, function (error) {
          if (error) console.error('Error Occured:', error);
          console.log('File deleted!');
        });
      } else {
        console.error('Error Occured:', error);
      }
    });
  }

  writeJson(callback) {
    // this.wipe();
    this.client.load((apiData) => {
      const data = JSON.stringify(apiData);
      //   console.log(data);
      fs.writeFile('news.json', data, (err) => {
        if (err) {
          throw err;
        }
        callback(apiData);
      });
    });
  }

  readData(callback) {
    // read JSON object from file
    fs.readFile('news.json', 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      // parse JSON object
      let newsData = JSON.parse(data.toString());
      // print JSON object

      callback(newsData);
    });
  }

  display() {
    console.log(this.store);
    return this.store;
    // document.querySelectorAll('.note').forEach((element) => {
    //     element.remove();
    // });
    // const notes = this.model.getNotes();
    // notes.forEach((note) => {
    //     const noteEl = document.createElement('div');
    //     // console.log(note);
    //     noteEl.textContent = note;
    //     noteEl.className = 'note';
    //     this.mainContainerEl.append(noteEl);
    // });
    // // To clear text from input
    // document.querySelector('#add-note-input').value = '';
  }
}

module.exports = View;
