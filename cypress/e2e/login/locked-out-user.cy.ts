import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Locked out user', () => {
  const user: LoginInfo = Cypress.env('users').lockedOut
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the locked out user')
  }

  it('shows a login error', () => {
    cy.visit('/')
    cy.getByTest('username').type(user.username)
    cy.getByTest('password').type(user.password)
    // initially there should be no errors
    // Tip: code this section after finishing checking the errors
    cy.log('**there are no errors**')
    cy.contains('[data-test=error]', 'locked out').should('not.exist')
    cy.getByTest('username').should('not.have.class', 'error')
    cy.getByTest('password').should('not.have.class', 'error')
    // click on the login button
    // https://on.cypress.io/click
    cy.getByTest('login-button').click()
    // confirm the page shows errors and stays on login URL
    cy.log('**shows errors**')
    cy.getByTest('username').should('have.class', 'error')
    cy.getByTest('password').should('have.class', 'error')
    cy.location('pathname').should('equal', '/')
    // confirm there is an error message
    // and click its "close" button after 1 second delay
    // https://on.cypress.io/contains
    // https://on.cypress.io/find
    // https://on.cypress.io/wait
    cy.contains('[data-test=error]', 'locked out')
      .should('be.visible')
      // wait 1 second for clarity
      .wait(1000)
      .find('button.error-button')
      .click()
    // confirm the errors go away, but the input fields are not cleared
    cy.log('**errors go away**')
    cy.contains('[data-test=error]', 'locked out').should('not.exist')
    cy.getByTest('username')
      .should('not.have.class', 'error')
      .and('have.value', user.username)
    cy.getByTest('password')
      .should('not.have.class', 'error')
      .and('have.value', user.password)
  })

  it('shows a login error refactored', () => {
    cy.visit('/')
    LoginPage.getUsername().type(user.username)
    LoginPage.getPassword().type(user.password)
    // initially there should be no errors
    // Tip: code this section after finishing checking the errors
    LoginPage.noErrors()
    // click on the login button
    // https://on.cypress.io/click
    cy.getByTest('login-button').click()
    // confirm the page shows errors and stays on login URL
    cy.log('**shows errors**')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
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
    LoginPage.noErrors()
    LoginPage.getUsername().should('have.value', user.username)
    LoginPage.getPassword().should('have.value', user.password)
  })
})
