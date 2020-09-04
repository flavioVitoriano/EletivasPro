const readline = require('readline');
const { exec } = require('child_process');

const animateProgress = require('./progress');
const addCheckMark = require('./checkmark');

let interval = -1;

/**
 * Remove passed packages
 * @returns {Promise<any>}
 */
const removePackages = (...packages) => new Promise((resolve, reject) => {
  const joinedPackages = packages.join(' ');
  process.stdout.write(
    `\nRemoving ${joinedPackages}... (This might take a while)`,
  );

  setTimeout(() => {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress(`Removing ${joinedPackages}`);
  }, 500);

  exec(`npm remove --save ${joinedPackages}`, err => {
    if (err) {
      reject(new Error(err));
    }

    clearInterval(interval);
    addCheckMark();
    resolve(`${joinedPackages} have been removed`);
  });
});

module.exports = removePackages;
