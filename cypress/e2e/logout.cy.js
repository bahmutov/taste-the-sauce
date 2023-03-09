// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

it('logs out', () => {
  // use LoginPage to log the standard user in
  // LoginPage.login(username, password)
  // confirm we are logged in by visiting the inventory page
  // https://on.cypress.io/visit
  // https://on.cypress.io/location
  // open the hamburger menu
  // https://on.cypress.io/contains
  // https://on.cypress.io/click
  // the menu should appear
  // in the menu find the "Logout" option and click on it
  // we should be transported back to the index page "/"
  // Confirm that we cannot go to the inventory page again
  // and that the right error message is shown
  // https://on.cypress.io/visit
  // LoginPage.showsError
})
