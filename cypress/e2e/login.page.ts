// @ts-check
/// <reference types="cypress" />

export const LoginPage = {
  getUserName() {
    return cy.get('[data-test="username"]')
  },
  getPassword: () => {
    return cy.get('[data-test="password"]')
  },
  getLoginBtn() {
    return cy.get('[data-test="login-button"]')
  },
  getError() {
    return cy.get('[data-test="error"]')
  },
  login(username: string, passward: string) {
    cy.session(
      `user ${username} session`,
      () => {
        cy.visit('/')
        LoginPage.getUserName().type(username)
        LoginPage.getPassword().type(passward, { log: false })
        LoginPage.getLoginBtn().click()
        cy.location('pathname').should('eq', '/inventory.html')
      },
      {
        validate() {
          // cy.visit('/inventory.html')
          // cy.location('pathname').should('eq', '/inventory.html')
          cy.getCookie('session-username').then((cookie) => {
            return cookie !== null
          })
        },
      },
    )
  },
  assertNoError() {
    cy.log('**there are no errors**')
    this.getError().should('not.exist') // can also use LoginPage.getError().should('not.exist')
    LoginPage.getUserName().should('not.have.class', 'error') // can also use this.getUserName()
    this.getPassword().should('not.have.class', 'error')
  },
  assertShowError(msg: string) {
    LoginPage.getError().should('be.visible').and('include.text', msg)
    LoginPage.getUserName().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },
}
