const { defineConfig } = require('cypress')
const registerDataSession = require('cypress-data-session/src/plugin')
// https://github.com/bahmutov/cypress-on-fix
const cypressOnFix = require('cypress-on-fix')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')
const path = require('path')

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
      coverage: false,
    },
    setupNodeEvents(cypressOn, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      console.log('the base url', config.baseUrl)
      if (!config.baseUrl.includes('localhost')) {
        console.log('disabled the code coverage plugin')
        config.env.coverage = false
      }

      // fix https://github.com/cypress-io/cypress/issues/22428
      const on = cypressOnFix(cypressOn)
      cypressSplit(on, config)
      registerDataSession(on, config)
      // https://github.com/bahmutov/cypress-watch-and-reload
      require('cypress-watch-and-reload/plugins')(on, config)
      // https://github.com/bahmutov/cypress-code-coverage
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)
      // IMPORTANT to return the config object
      // with the any changed environment variables
      return config
    },
  },

  component: {
    setupNodeEvents(cypressOn, config) {
      const on = cypressOnFix(cypressOn)
      cypressSplit(on, config)
      // https://github.com/bahmutov/cypress-code-coverage
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)
      // IMPORTANT to return the config object
      // with the any changed environment variables
      return config
    },
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@cypress': path.resolve(__dirname, 'cypress'),
          },
        },
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            // application and Cypress files are bundled like React components
            // and instrumented using the babel-plugin-istanbul
            {
              test: /\.jsx?$/,
              // do not instrument node_modules
              // or Cypress component specs
              exclude: /node_modules|\.cy\.js/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['istanbul'],
                },
              },
            },
          ],
        },
      },
    },
  },
})
