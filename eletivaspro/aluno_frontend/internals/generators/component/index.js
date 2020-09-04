/**
 *
 * Component Generator
 *
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMemo',
      default: true,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../src/components/{{>componentName}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/components/{{>componentName}}/tests/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../../src/components/index.js',
        pattern: /export.*;.*\n(?!export)/g,
        template: 'export { default as {{>componentName}} } from \'./{{>componentName}}\';\n',
        separator: '',
        abortOnFail: true,
      }
    ];

    // If the user wants i18n messages
    if (data.wantMessages) {
      actions.push({
        type: 'append',
        path: '../../src/translations/en.js',
        pattern: /components.*?},(?=\n {2}},)/s,
        template: '    {{>propertyName}}: {\n      header: \'This is the {{>componentName}} component!\',\n    },',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/translations/fr.js',
        pattern: /components.*?},(?=\n {2}},)/s,
        template: '    {{>propertyName}}: {\n      header: "C\'est le composant {{>componentName}}!",\n    },',
        abortOnFail: true,
      });
    }

    // If the user wants Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../src/components/{{>componentName}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
