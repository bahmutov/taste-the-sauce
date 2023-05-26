import { LoginPage } from '@support/pages/login.page'

describe('Login form', () => {
  // visit the login page before each test
  beforeEach(() => {
    cy.visit('/')
  })

  it('hides the username', () => {
    cy.get(LoginPage.selectors.username).type('username', { hide: true })
  })
})
