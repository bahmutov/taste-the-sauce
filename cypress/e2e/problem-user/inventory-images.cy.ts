import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Problem user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    const user: LoginInfo = Cypress.env('users').problem
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  it('shows 404 thumbnail images', () => {
    // get all inventory item images
    // and confirm there are more than 3 items
    //
    // get the attribute "src" from each element
    //
    // and pass it to a "should(callback)" function
    //
    // we want to confirm the following in these image urls:
    // all urls should be the same
    //
    // the one url should include "sl-404" string
  })
})
