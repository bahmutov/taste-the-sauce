// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

describe('anonymous user', () => {
  it('gets an error trying to visit the inventory page', () => {
    cy.visit('/inventory.html')
    // confirm we are on root page
    // https://on.cypress.io/location
    cy.location('pathname').should('equal', '/')
    // confirm the page shows an error
    // confirm the error message includes the page name
    LoginPage.getError()
      .should('be.visible')
      .and('include.text', 'Epic sadface')
      .and('include.text', 'inventory.html')
    // https://on.cypress.io/contains
    // confirm the username and the password fields
    // have the error class included
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  })
})
