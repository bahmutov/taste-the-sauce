import { LoginPage } from '@support/pages/login.page'
// how can we stub this function called by the Login form page?
// verifyCredentials from 'src/utils/Credentials'
// plu we need to stub Constants from 'src/utils/Constants.js

describe('Login form', () => {
  // a fake user that normally cannot log in
  // but we want to stub the verifyCredentials and VALID_USERNAMES
  // to make this user work
  const username = 'aUser'
  const password = 'aPassword'

  it('calls verifyCredentials', () => {
    // create a stub function that always returns true
    // give this stub an alias "verify"
    // https://on.cypress.io/stub
    // https://on.cypress.io/as
    //
    // visit the login page
    // and before the application loads its code
    // set properties "window.VALID_USERNAMES" and
    // "window.verifyCredentials" to our fake values
    // https://on.cypress.io/visit
    // Tip: use the "onBeforeLoad" method
    // Tip 2: read these properties from the "window" object
    // in your application code if they are set.
    cy.visit('/', {
      onBeforeLoad(win) {},
    })
    // fill the form with our test username info
    cy.get(LoginPage.selectors.form).fillForm({
      [LoginPage.selectors.username]: username,
      [LoginPage.selectors.password]: password,
    })
    LoginPage.getLogin().click()
    // we should be logged in and redirected to the inventory page
    cy.location('pathname').should('equal', '/inventory.html')
    // the stub aliased "verify" should have been called once by the application
    // with the test username and password entered in the login form
  })
})
