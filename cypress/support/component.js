// https://github.com/bahmutov/cypress-map
import 'cypress-map'

import './commands'

import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
