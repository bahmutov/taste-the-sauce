import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

const user: LoginInfo = Cypress.env('users').standard

// only run this test to demonstrate the failure
// and the full HTML page saved by the cyclope plugin
it.skip('fails on purpose', () => {
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html')
  cy.location('pathname').should('equal', '/inventory.html')
  // make the test fail on purpose by using a wrong selector
  // instead of class "inventory_item" we are querying "inventory-item"
  // which fails to find anything
  cy.get('.inventory-item', { timeout: 0 }).should('have.length.greaterThan', 2)
})
