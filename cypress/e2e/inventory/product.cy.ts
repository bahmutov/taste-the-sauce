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
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('shows the item', () => {
    // the name and price of the item we are looking for
    const name = 'Sauce Labs Fleece Jacket'
    const price = '$49.99'
    cy.contains('.inventory_item', name)
      // confirm the element has "data-itemid" attribute
      // and its value is a string
      // https://on.cypress.io/should
      // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      .should('have.attr', 'data-itemid')
      .should('be.a', 'string')
      // pass the value of the "data-itemid" attribute into a callback
      // https://on.cypress.io/then
      .then((itemId) => {
        // find the inventory item again
        // and inside find the anchor link element
        // https://on.cypress.io/contains
        // https://on.cypress.io/find
        cy.contains('.inventory_item', name)
          .find('.inventory_item_label a')
          // Since you know the item's id
          // you can confirm the exact value of the "id" attribute
          // (it has item id with title link text)
          .should('have.attr', 'id', `item_${itemId}_title_link`)
          // click on the anchor link
          .click()
        // confirm we transition to the item's page
        // https://on.cypress.io/location
        cy.location('pathname').should('equal', '/inventory-item.html')
        // because we know the item's id
        // confirm the URL search parameter string
        // includes "id=item id" substring
        cy.location('search').should('include', `id=${itemId}`)
        // confirm the item details component is visible
        cy.get('#inventory_item_container .inventory_details')
          .should('be.visible')
          .within(() => {
            // and inside has the item's name (with large size class)
            // and the item's expected price
            // https://on.cypress.io/within
            cy.contains('.inventory_details_name.large_size', name)
            cy.contains('.inventory_details_price', price)
          })
      })
    // go back to the inventory page by clicking
    // "Back to products" button
    cy.get('[data-test="back-to-products"]').click()
    // confirm we are back at the inventory page
    cy.location('pathname').should('equal', '/inventory.html')
  })
})
