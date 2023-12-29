import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Invalid user information', () => {
  // this is a valid user, but we will try an incorrect password
  const user: LoginInfo = Cypress.env('users').standard

  it('wrong password', () => {
    cy.visit('/')
    // type the valid username and some made up password
    LoginPage.getUsername().type(user.username)
    LoginPage.getPassword().type('incorrect-password')
    // click on the login button
    // https://on.cypress.io/click
    cy.getByTest('login-button').click()
    // confirm the page shows errors and stays on login URL
    LoginPage.showsError(
      'Epic sadface: Username and password do not match any user in this service',
    )
    cy.location('pathname').should('equal', '/')
  })

  it('wrong username and password', () => {
    cy.visit('/')
    // make up both username and password
    LoginPage.getUsername().type('user-not-found')
    LoginPage.getPassword().type('incorrect-password')
    // click on the login button
    // https://on.cypress.io/click
    cy.getByTest('login-button').click()
    // confirm the page shows errors and stays on login URL
    LoginPage.showsError(
      'Epic sadface: Username and password do not match any user in this service',
    )
    cy.location('pathname').should('equal', '/')
  })
})
