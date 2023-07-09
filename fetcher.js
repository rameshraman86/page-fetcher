const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2, 4);
const URL = input[0];
const fileName = input[1];


const writeToFile = (URL, fileName) => {
  return request(URL, (error, response, body) => {
    if (error) {
      console.error(Error(error));
      return;
    }
    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when accessing ${URL}. Response: ${body}`;
      console.error(Error(msg));
      return;
    }

    //if URL was read successfully, write its body into filename
    fs.writeFile(fileName, body, err => {
      if (err) {
        console.error(Error(err));
      }

      //if write to file was success, console log details
      fs.stat(fileName, (err, stats) => {
        if (err) {
          console.error(Error(err));
        }
        console.log(`Downloaded and saved ${stats.size} bytes to ${fileName}`);
      });

    });
  });
};

writeToFile(URL, fileName);