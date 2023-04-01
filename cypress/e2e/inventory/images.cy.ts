import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'

describe('Regular user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    const user: LoginInfo = Cypress.env('users').standard
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  it('sees unique thumbnail images', () => {
    // get all inventory item images
    // and confirm there are more than 3 items
    cy.get('img.inventory_item_img')
      .should('have.length.greaterThan', 3)
      // get the attribute "src" from each element
      .mapInvoke('getAttribute', 'src')
      // and pass it to a "should(callback)" function
      .should((urls: string[]) => {
        // we want to confirm the following in these image urls:
        // all urls should be unique
        const unique = Cypress._.uniq(urls)
        expect(unique, 'image urls').to.have.length(urls.length)
        // no url includes "sl-404" string
        urls.forEach((url, k) => {
          expect(url, `url ${k + 1}`).to.not.include('sl-404')
        })
      })
  })
})
