// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('shows a login error', () => {
  cy.visit('/')
  cy.get('[data-test="username"]').type('locked_out_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  cy.log('**there are no errors**')
  //
  // click on the login button
  // https://on.cypress.io/click
  //
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')
  //
  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  //
  // confirm the errors go away, but the input fields are not cleared
  cy.log('**errors go away**')
})
