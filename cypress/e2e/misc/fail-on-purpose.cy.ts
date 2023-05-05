import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

const user: LoginInfo = Cypress.env('users').standard

it('fails on purpose', () => {
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html')
  cy.location('pathname').should('equal', '/inventory.html')
  // make the test fail on purpose by using a wrong selector
  // instead of class "inventory_item" we are querying "inventory-item"
  // which fails to find anything
  cy.get('.inventory-item').should('have.length.greaterThan', 2)
})
