const shell = require('shelljs');
const { exec } = require('child_process');
const addCheckMark = require('./helpers/checkmark.js');
const removeLineFromFile = require('./helpers/remove-line-from-file');
const removePackages = require('./helpers/remove-packages');
const replaceStringFromFile = require('./helpers/replace-string-from-file');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.test('-e', 'internals/templates')) {
  shell.echo('The example is deleted already.');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Handle api/
shell.rm('-rf', 'src/api');
shell.mv('internals/templates/api', 'src');

// Handle assets/
shell.rm('-rf', 'src/assets');
shell.mv('internals/templates/assets', 'src');

// Handle components/
shell.rm('-rf', 'src/components');
shell.mv('internals/templates/components', 'src');

// Handle containers/
shell.rm('-rf', 'src/containers');
shell.mv('internals/templates/containers', 'src');

// Handle store/
shell.rm('-rf', 'src/store');
shell.mv('internals/templates/store', 'src');

// Handle translations/
shell.rm('-rf', 'src/translations');
shell.mv('internals/templates/translations', 'src');

// Handle utils/
shell.rm('-rf', 'src/utils');
shell.mv('internals/templates/utils', 'src');

// Replace the files in the root src/ folder
shell.cp('internals/templates/index.js', 'src/index.js');
shell.cp('internals/templates/index.scss', 'src/index.scss');
shell.cp('internals/templates/serviceWorker.js', 'src/serviceWorker.js');
shell.cp('internals/templates/setupTests.js', 'src/setupTests.js');

// Remove the templates folder
shell.rm('-rf', 'internals/templates');

// Remove the scripts folder
shell.rm('-rf', 'internals/scripts');

addCheckMark();

/**
 * Remove default example Git commit
 * @returns {Promise<any>}
 */
const commitToGitRepository = () => new Promise((resolve, reject) => {
  exec('git add . --all && git commit -qm "Remove default example"', (err, stdout) => {
    if (err) {
      reject(new Error(err));
    } else {
      resolve(stdout);
    }
  });
});

(async () => {
  await removeLineFromFile('package.json', '"presetup"');
  await removeLineFromFile('package.json', '"setup"');
  await removeLineFromFile('package.json', '"clean"');
  await removeLineFromFile('package.json', '"chalk"');
  await removeLineFromFile('package.json', '"shelljs"');
  await removeLineFromFile('package.json', '"compare-versions"');
  await replaceStringFromFile('package.json', /,(?=.*\n.*})/g, '');
  await removePackages('chalk', 'shelljs', 'compare-versions');

  // Commit the changes
  await commitToGitRepository();

  shell.echo('\nCleanup done. Happy Coding!!!');
})();
