export const LoginPage = {
  // common element selectors we might need
  selectors: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    form: '.login-box form',
  },

  getUsername() {
    return cy.get(LoginPage.selectors.username)
  },
  getPassword() {
    return cy.get(LoginPage.selectors.password)
  },
  getError() {
    return cy.getByTest('error')
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  // new methods
  getLogin() {
    return cy.getByTest('login-button')
  },
  showsError(text: string) {
    cy.contains('[data-test=error]', text).should('be.visible')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },
  /**
   * Logs the user and caches the session
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    // https://on.cypress.io/session
    cy.session(
      `user ${username} login`,
      () => {
        cy.log('**log in**')
        cy.visit('/')
        cy.get(LoginPage.selectors.form).fillForm({
          [LoginPage.selectors.username]: username,
          [LoginPage.selectors.password]: password,
        })
        // confirm the fields were entered correctly
        LoginPage.getUsername().should('have.value', username)
        LoginPage.getPassword().should('have.value', password)
        LoginPage.getLogin().click()
        cy.location('pathname').should('equal', '/inventory.html')
      },
      {
        validate() {
          cy.log('**validate login session**')
          cy.getCookie('session-username').should('exist')
        },
      },
    )
  },
} as const
