/**
 *
 * Container Generator
 *
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
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
      name: 'wantPage',
      default: false,
      message: 'Will be a page?',
    },
    {
      type: 'confirm',
      name: 'wantAuthentication',
      default: false,
      message: 'Do you want authentication?',
      when: data => data.wantPage,
    },
    {
      type: 'confirm',
      name: 'wantMemo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
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
      default: true,
      message: 'Do you want to load resources asynchronously?',
      when: data => !data.wantPage,
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../src/containers/{{>containerName}}/index.js',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/containers/{{>containerName}}/tests/index.test.js',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If the component is a page, it will be added on the routes
    if (data.wantPage) {
      actions.push({
        type: 'append',
        path: '../../src/containers/RoutesProvider/routes.js',
        pattern: /import.*;.*\n(?=\s)/g,
        template: 'import {{>containerName}} from \'containers/{{>containerName}}/Loadable\';\n',
        separator: '',
        abortOnFail: true,
      });

      actions.push({
        type: 'append',
        path: '../../src/containers/RoutesProvider/routes.js',
        pattern: /,.*\n.*(?=redirect)/g,
        template: '{{>propertyName}}: \'{{>urlName}}\',\n  ',
        separator: '',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/containers/RoutesProvider/routes.js',
        pattern: /,(?=.*\n.*\n.*paths.notFound)/g,
        template: `\n  {\n    path: paths.{{>propertyName}},\n    component: {{>containerName}},\n${
          data.wantAuthentication ? '    auth: true,\n' : ''
        }  },`,
        separator: '',
        abortOnFail: true,
      });
    }

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'append',
        path: '../../src/translations/en.js',
        pattern: /containers.*?},(?=\n {2}},)/s,
        template: '    {{>propertyName}}: {\n      header: \'This is the {{>containerName}} component!\',\n    },',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/translations/fr.js',
        pattern: /containers.*?},(?=\n {2}},)/s,
        template: '    {{>propertyName}}: {\n      header: "C\'est le composant {{>containerName}}!",\n    },',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/tests/actions.test.js',
        templateFile: './container/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path:
          '../../src/containers/{{>containerName}}/tests/selectors.test.js',
        templateFile: './container/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/tests/reducer.test.js',
        templateFile: './container/reducer.test.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/store/reducers.js',
        pattern: /import.*;.*\n(?=\s)/g,
        template: 'import {{>reducerName}} from \'containers/{{>containerName}}/reducer\';\n',
        separator: '',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/store/reducers.js',
        pattern: /,.*\n.*(?=})/g,
        template: '  {{>propertyName}}: {{>reducerName}},\n',
        separator: '',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/saga.js',
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/tests/saga.test.js',
        templateFile: './container/saga.test.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/store/sagas.js',
        pattern: /import.*;.*\n(?=\s)/g,
        template: 'import {{>sagaName}} from \'containers/{{>containerName}}/saga\';\n',
        separator: '',
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: '../../src/store/sagas.js',
        pattern: /yield.*;.*\n.*(?=})|{.*\n.*[\n]?.*(?=})/g,
        template: '  yield fork({{>sagaName}});\n',
        separator: '',
        abortOnFail: true,
      });
    }

    if (data.wantPage || data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{>containerName}}/Loadable.js',
        templateFile: './container/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
