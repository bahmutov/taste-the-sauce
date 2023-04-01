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
    cy.get('img.inventory_item_img')
      .should('have.length.greaterThan', 3)
      // get the attribute "src" from each element
      .mapInvoke('getAttribute', 'src')
      // and pass it to a "should(callback)" function
      .should((urls: string[]) => {
        // we want to confirm the following in these image urls:
        // all urls should be the same
        const unique = Cypress._.uniq(urls)
        expect(unique, 'image urls').to.have.length(1)
        // the one url should include "sl-404" string
        expect(unique[0], 'included 404').to.include('sl-404')
      })
  })
})
