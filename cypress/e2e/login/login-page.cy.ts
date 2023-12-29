it('fills the form and logs in', () => {
  cy.visit('/')
  cy.getByTest('LoginForm')
    .should('be.visible')
    .within(() => {
      cy.getByTest('username').type('standard_user')
      cy.getByTest('password').type('secret_sauce')
      cy.getByTest('login-button').click()
    })
  cy.location('pathname').should('equal', '/inventory.html')
})
