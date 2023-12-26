const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')

module.exports = defineConfig({
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
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      registerDataSession(on, config)
      return config
    },
  },
})
