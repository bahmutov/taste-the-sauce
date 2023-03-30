import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Invalid user information', () => {
  // this is a valid user, but we will try an incorrect password
  const user: LoginInfo = Cypress.env('users').standard

  it('wrong password', () => {
    cy.visit('/')
    // type the valid username and some made up password
    //
    // click on the login button
    // https://on.cypress.io/click
    //
    // confirm the page shows errors and stays on login URL
  })

  it('wrong username and password', () => {
    cy.visit('/')
    // make up both username and password
    //
    // click on the login button
    // https://on.cypress.io/click
    //
    // confirm the page shows errors and stays on login URL
  })
})
