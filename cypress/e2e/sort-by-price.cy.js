// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

describe('sorting', () => {
  it('by price lowest to highest', () => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
    cy.log('**sort by price low to high**')
    // sort the items from low to high
    // confirm the item prices are sorted in ascending order
  })

  it('by price highest to lowest', () => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
    cy.log('**sort by price low to high**')
    // sort the items from high to low price
    // confirm the item prices are sorted from highest to lowest
  })
})
