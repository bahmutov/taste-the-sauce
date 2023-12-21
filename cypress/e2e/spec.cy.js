// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('visit the page', () => {
  cy.visit('/')
  // Tip: grab the username and the password from the login page
  // It is ok for now to hardcode it in the spec source here
  //
  // get the username field and type the standard user
  // https://on.cypress.io/get
  // https://on.cypress.io/type
  cy.get('[data-test="username"]').type('standard_user')
  // get the password field and type the password
  cy.get('[data-test="password"]').type('secret_sauce')
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  //
  // confirm the inventory page really loads
  cy.location('pathname').should('equal', '/inventory.html')
  // check that the inventory list is visible
  // and there are at least 3 items
  // https://on.cypress.io/get
  // https://on.cypress.io/find
  // https://glebbahmutov.com/cypress-examples/commands/assertions.html
  cy.get('.inventory_item').should('have.length.gte', 3)
})
