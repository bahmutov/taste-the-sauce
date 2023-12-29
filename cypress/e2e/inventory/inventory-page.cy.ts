beforeEach(() => {
  cy.visit('/')
  cy.getByTest('LoginForm')
    .should('be.visible')
    .within(() => {
      cy.getByTest('username').type('standard_user')
      cy.getByTest('password').type('secret_sauce')
      cy.getByTest('login-button').click()
    })
})

it('has items on the inventory page', () => {
  cy.location('pathname').should('equal', '/inventory.html')
  // the inventory component loads
  cy.getByTest('InventoryPage').should('be.visible')
  // the inventory loads at least a few items
  cy.getByTest('InventoryPageItem')
    .should('have.length.above', 2)
    .first()
    .within(() => {
      cy.getByTest('ItemTitle', 'Sauce Labs Backpack')
      cy.getByTest('ItemPrice', '$29.99')
      cy.getByTest('ItemActionButton', 'Add to cart')
    })
})

it('adds items to the cart', () => {
  cy.location('pathname').should('equal', '/inventory.html')
  cy.getByTest('InventoryPage').should('be.visible')

  // initially there is no cart badge
  cy.getByTest('CartBadge').should('not.exist')

  cy.getByTest('InventoryPageItem')
    .first()
    .within(() => {
      cy.getByTest('ItemActionButton', 'Add to cart').click()
    })
  // cart badge shows 1
  cy.getByTest('CartBadge', '1')
  // and the item changes its label to "Remove"
  cy.getByTest('InventoryPageItem')
    .first()
    .getByTest('ItemActionButton')
    .should('have.text', 'Remove')
})
