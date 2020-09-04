/* eslint-disable lodash/prefer-lodash-method */
const fs = require('fs');

const removeLineFromFile = (file, searchKeyword) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8' }, (readError, data) => {
      if (readError) return reject(readError);

      const dataArray = data.split('\n');
      let lastIndex = -1;

      for (let index = 0; index < dataArray.length; index += 1) {
        if (dataArray[index].includes(searchKeyword)) {
          lastIndex = index;
          break;
        }
      }

      dataArray.splice(lastIndex, 1);

      const updatedData = dataArray.join('\n');
      fs.writeFile(file, updatedData, (writeError) => {
        if (writeError) return reject(writeError);
        resolve('Successfully updated the file data');
      });
    });
  });

module.exports = removeLineFromFile;
