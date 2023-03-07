// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('anonymous user', () => {
  it('gets an error trying to visit the inventory page', () => {
    cy.visit('/inventory.html')
    // confirm we are on root page
    // https://on.cypress.io/location
    // confirm the page shows an error
    // confirm the error message includes the page name
    // https://on.cypress.io/contains
    // confirm the username and the password fields
    // have the "error" CSS class included
  })
})
