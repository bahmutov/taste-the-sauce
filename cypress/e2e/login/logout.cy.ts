/// <reference types="cypress" />
import { LoginPage } from '../../support/pages/login.page'

describe('log out', () => {
  it('logs out', () => {
    // use LoginPage to log the standard user in
    // LoginPage.login(username, password)
    // confirm we are logged in by visiting the inventory page

    // create a small type on the fly using jsdoc comment
    // just to help type check help us
    /** @type {{username: string, password: string}} */
    const user = Cypress.env('users').standard
    LoginPage.login(user.username, user.password)
    // https://on.cypress.io/visit
    // https://on.cypress.io/location
    // open the hamburger menu
    cy.visit('/inventory.html')
    cy.contains('button', 'Open Menu').click()
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    // the menu should appear
    cy.get('.bm-menu')
      .should('be.visible')
      .within(() => {
        cy.contains('a', 'Logout').click()
      })

    // in the menu find the "Logout" option and click on it
    // we should be transported back to the index page "/"
    cy.location('pathname').should('eq', '/')
    // Confirm that we cannot go to the inventory page again
    cy.visit('/inventory.html')
    LoginPage.assertShowError('Epic sadface')
    // and that the right error message is shown
    // https://on.cypress.io/visit
    // LoginPage.showsError
  })
})
