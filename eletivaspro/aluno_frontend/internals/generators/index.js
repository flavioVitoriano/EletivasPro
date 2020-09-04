/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const path = require('path');
const { execSync } = require('child_process');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);

  plop.setPartial('componentName', '{{properCase name}}');
  plop.setPartial('containerName', '{{properCase name}}{{#if wantPage}}Page{{/if}}');
  plop.setPartial('propertyName', '{{camelCase name}}{{#if wantPage}}Page{{/if}}');
  plop.setPartial('reducerName', '{{>propertyName}}Reducer');
  plop.setPartial('sagaName', '{{>propertyName}}Saga');
  plop.setPartial('urlName', '/{{dashCase name}}');

  plop.setActionType('prettify', (answers, config) => {
    const containerName = plop.getHelper('properCase')(answers.name) + (answers.wantPage ? 'Page' : '');
    const srcPath = path.join(__dirname, '/../../src/');
    const containerPath = path.join(
      srcPath,
      config.path,
      containerName,
    );
    const containerFilesPath = path.join(containerPath, '**', '**.js');
    const storePath = path.join(srcPath, '/store/');
    const routesPath = path.join(srcPath, 'containers', 'RoutesProvider');

    execSync(`npm run prettify --scripts-prepend-node-path -- "${containerFilesPath}"`);
    execSync(`eslint ${containerPath} ${storePath} ${routesPath} --fix --rule 'no-unused-vars: off'`);
    return containerPath;
  });
};
