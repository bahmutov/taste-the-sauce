// cypress/e2e/spec.cy.js

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('visits the store', () => {
  cy.visit('/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.location('pathname').should('eq', '/inventory.html')
  cy.get('div[class="inventory_list"]')
    .should('be.visible')
    .find('div[class="inventory_item"]')
    .should('have.length.greaterThan', 3);
})