/// <reference types="cypress" />
import { LoginPage } from '../../support/pages/login.page'
import { LoginInfo } from '..'
const lockedUser: LoginInfo = Cypress.env('users').lockedOut
// we can even check if the user object is valid
if (!lockedUser) {
  throw new Error('Missing the locked out user')
}

it('shows a login error', () => {
  cy.visit('/')
  LoginPage.getUsername().type('locked_out_user')
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
  LoginPage.getUsername().should('have.class', 'error')
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

it.only('shows a login error refactored', () => {
  cy.visit('/')
  cy.get(LoginPage.selectors.form).fillForm({
    [LoginPage.selectors.username]: lockedUser.username,
    [LoginPage.selectors.password]: lockedUser.password,
  })
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  LoginPage.assertNoError()
  // click on the login button
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')
  LoginPage.assertShowError('locked out')
  cy.location('pathname').should('equal', '/')
  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  LoginPage.getError()
    .should('include.text', 'locked out')
    .and('be.visible')
    // wait 1 second for clarity
    .wait(1000)
    .find('button.error-button')
    .click()
  // confirm the errors go away, but the input fields are not cleared
  LoginPage.assertNoError()
  LoginPage.getUsername().should('have.value', lockedUser.username)
  LoginPage.getPassword().should('have.value', lockedUser.password)
})
