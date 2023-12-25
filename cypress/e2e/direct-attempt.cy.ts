/// <reference types="cypress" />
import { LoginPage } from './login.page'

describe('anonymous user', () => {
  it('gets an error trying to visit the inventory page', () => {
    cy.visit('/inventory.html')
    // confirm we are on root page
    // https://on.cypress.io/location
    cy.location('pathname').should('eq', '/')
    // confirm the page shows an error
    // confirm the error message includes the page name
    // https://on.cypress.io/contains
    // confirm the username and the password fields
    // have the "error" CSS class included
    LoginPage.getError()
      .should('be.visible')
      .and('include.text', 'Epic sadface')
      .and('include.text', 'inventory.html')
    LoginPage.getUserName().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  })
})

describe('Login form', () => {
  // visit the login page before each test
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows an error for empty username field', () => {
    // click on the login button without
    // entering any of the information
    LoginPage.getLoginBtn().click()
    // the login page should show the error
    // with text "Epic sadface: Username is required"
    LoginPage.assertShowError('Epic sadface: Username is required')
  })

  it('shows an error for empty password field', () => {
    // enter username "name" into the input field
    // and click the login button
    // without entering the password
    LoginPage.getUserName().type('name')
    LoginPage.getLoginBtn().click()
    // the login page should show the error
    // with text "Epic sadface: Password is required"
    LoginPage.assertShowError('Epic sadface: Password is required')
  })
})
