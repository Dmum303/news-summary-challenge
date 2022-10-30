class Client {
  constructor() {}
  load(callback) {
    //this is only fetching from this part of the url
    fetch(
      'https://content.guardianapis.com/search?q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=test'
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        callback(data);
      });
  }
}

module.exports = Client;
