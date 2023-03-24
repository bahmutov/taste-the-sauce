const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    experimentalRunAllSpecs: true,
    env: {
      users: {
        standard: {
          username: 'standard_user',
          password: 'secret_sauce',
        },
        lockedOut: {
          username: 'locked_out_user',
          password: 'secret_sauce',
        },
        problem: {
          username: 'problem_user',
          password: 'secret_sauce',
        },
        glitch: {
          username: 'performance_glitch_user',
          password: 'secret_sauce',
        },
      },
      // list the files and file patterns to watch
      'cypress-watch-and-reload': {
        watch: ['src/**'],
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      cypressSplit(on, config)
      registerDataSession(on, config)
      // https://github.com/bahmutov/cypress-watch-and-reload
      require('cypress-watch-and-reload/plugins')(on, config)
      // https://github.com/bahmutov/cypress-code-coverage
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
