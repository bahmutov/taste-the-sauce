// import the bike light JSON fixture file
// using the relative path
import item from '@fixtures/bike-light.json'

describe('Inventory', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    cy.getByTest('username').type('standard_user')
    cy.getByTest('password').type('secret_sauce')
    cy.getByTest('login-button').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('has an item with details', () => {
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
