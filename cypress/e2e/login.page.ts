export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]')
  },
  getPassword() {
    return cy.get('[data-test="password"]')
  },
  getError() {
    return cy.get('[data-test=error]')
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  // new methods
  getLogin() {
    return cy.get('[data-test=login-button]')
  },
  /**
   * @param text The expected error message
   */
  showsError(text: string) {
    cy.contains('[data-test=error]', text).should('be.visible')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },
  /**
   * Logs the user and caches the session
   */
  login(username: string, password: string) {
    // https://on.cypress.io/session
    cy.session(`user ${username} login`, () => {
      cy.log('**log in**')
      cy.visit('/')
      LoginPage.getUsername().type(username)
      // hide the password from the Console Log
      LoginPage.getPassword().type(password, { log: false })
      LoginPage.getLogin().click()
      cy.location('pathname').should('equal', '/inventory.html')
    })
  },
}
