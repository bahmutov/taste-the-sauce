import { LoginPage } from '@support/pages/login.page'

describe('Login links', () => {
  // 🚨 INCORRECT
  // can you explain why the following test fails?
  // Tip: the first click works, but the second fails
  it('all lead back to the login page', () => {
    cy.visit('/')
    cy.get('a').click({ multiple: true })
    LoginPage.showsError('Epic sadface')
    cy.location('pathname').should('equal', '/')
  })

  it('all lead back to the login page (fixed)', () => {
    cy.visit('/')
    // get text for each link
    // iterate over text for each "a" element
    // find the link again using cy.contains command
    // and click on it
    // confirm the page shows an error
    // and the page loads the "/" again
  })
})
