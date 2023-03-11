// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

describe('Product', () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows the item', () => {
    // the name and price of the item we are looking for
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'
    // select the inventory item with that name
    // click on the title link to transition to the product view
    // https://on.cypress.io/contains
    // https://on.cypress.io/find
    // https://on.cypress.io/click
    //
    // confirm we transition to the item's page
    // https://on.cypress.io/location
    //
    // we do not know the item id, thus check
    // that the search parameters in the URL
    // simply have id=number
    //
    // confirm the item details component is visible
    //
    // and inside has the item's name (with large size class)
    // and the item's expected price
    // https://on.cypress.io/within
    //
    // go back to the inventory page by clicking
    // "Back to products" button
    //
    // confirm we are back at the inventory page
    //
  })
})
