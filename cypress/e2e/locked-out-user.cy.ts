/// <reference types="cypress" />
import { LoginPage } from './login.page'

it('shows a login error', () => {
  cy.visit('/')
  LoginPage.getUserName().type('locked_out_user')
  LoginPage.getPassword().type('secret_sauce')
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  cy.log('**there are no errors**')
  LoginPage.assertNoError()

  // click on the login button
  // https://on.cypress.io/click
  LoginPage.getLoginBtn().click()
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')

  cy.location('pathname').should('equal', '/')
  LoginPage.getUserName().should('have.class', 'error')
  LoginPage.getPassword().should('have.class', 'error')

  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  LoginPage.getError()
    .should('contain', 'locked out')
    .wait(1000)
    .find('button.error-button')
    .click()
  // confirm the errors go away, but the input fields are not cleared
  cy.log('**errors go away**')
  LoginPage.assertNoError()
})
