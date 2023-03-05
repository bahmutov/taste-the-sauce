// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has an item with details', () => {
  // confirm there is an item in the inventory
  // with:
  //   name: "Sauce Labs Bike Light"
  //   description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  //   price: $9.99
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
})
