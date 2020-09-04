/* eslint-disable lodash/prefer-lodash-method */
const fs = require('fs');

const replaceStringFromFile = (file, regex, replaceKeyword) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8' }, (readError, data) => {
      if (readError) return reject(readError);
      const replacedData = data.replace(regex, replaceKeyword);
      fs.writeFile(file, replacedData, (writeError) => {
        if (writeError) return reject(writeError);
        resolve('Successfully updated the file data');
      });
    });
  });

module.exports = replaceStringFromFile;
