import { LoginPage } from '@support/pages/login.page'

describe('Product', () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)

    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('navigates by clicking the thumbnail image', () => {
    const name = 'Sauce Labs Fleece Jacket'
    cy.contains('.inventory_item', name)
      .find('.inventory_item_img a:has(img)')
      .click()
    cy.location('pathname').should('equal', '/inventory-item.html')
    cy.location('search').should('match', /id=\d+/)
    cy.contains('button', 'Back to products').click()
    // confirm we are back at the inventory page
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('navigates to a randomly picked item', () => {
    // randomly pick an item on the page
    // Tip: use cy.sample query command from cypress-map plugin
    // get its name, then click on the item
    // the browser should navigate to the item's page
    // confirm the page has the right item name
  })
})
