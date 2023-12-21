// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import 'cypress-map'
const { _ } = Cypress

it('confirms the item with the lowest price', () => {
  cy.visit('/')

  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
  cy.get('.inventory_item').should('have.length.gte', 3)

  cy.get('.inventory_list')
    .find('.inventory_item_price')
    .map('innerText')
    .print()
    .mapInvoke('substring', 1)
    .map(parseFloat)
    .print()
    .apply(_.min)
    .should('equal', 7.99)
})
