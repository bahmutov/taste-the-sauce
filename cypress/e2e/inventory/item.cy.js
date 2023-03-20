beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
  // load the bike light JSON fixture file
  // https://on.cypress.io/fixture
})

it('has an item with details', () => {
  cy.fixture('bike-light.json').then((item) => {
    // and confirm there is an item in the inventory
    // with the name, description, and price listed in teh fixture object
    // https://on.cypress.io/contains
    // https://on.cypress.io/within
    cy.contains('.inventory_item', item.name).within(() => {
      cy.contains('.inventory_item_name', item.name)
      cy.contains('.inventory_item_desc', item.description)
      cy.contains('.inventory_item_price', item.price)
    })
  })
})
