// first import the 3rd party Cypress plugins
// to make them available in every command

// https://github.com/bahmutov/cypress-code-coverage
import '@bahmutov/cypress-code-coverage/support'

// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'
// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
// @ts-ignore
chai.use(require('chai-sorted'))

// @ts-ignore
require('cypress-watch-and-reload/support')

// import custom commands
import './commands'
