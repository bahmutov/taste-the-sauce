import item from '@fixtures/bike-light.json'

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')

  cy.fixture('bike-light.json').as('item')
})

it('has an item with details', () => {
  // confirm there is an item in the inventory
  // with:
  //   name: "Sauce Labs Bike Light"
  //   description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  //   price: $9.99
  cy.contains('.inventory_item', 'Sauce Labs Bike Light')
    .should('exist')
    .within(() => {
      cy.contains(
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night",
      )
      //   cy.get('.inventory_item_price').prop('innerText').should('equal', '$9.99')
      cy.get('.inventory_item_price').invoke('text').should('equal', '$9.99')
      cy.contains('.inventory_item_price', '$9.99')
    })
})

interface Item {
  name: string
  description: string
  price: string
}
// using cy.get('@item')
it('has an item with details(using fixture)', () => {
  cy.get<Item>('@item').then((data) => {
    cy.contains('.inventory_item', data.name).within(() => {
      cy.contains('.inventory_item_desc', data.description)
      cy.contains('.inventory_item_price', data.price)
    })
  })
})

// access the existing alias "item" inside the function callback
// using the "this.item" syntax
it('has an item with details(using this)', function () {
  cy.contains('.inventory_item', this.item.name).within(() => {
    cy.contains('.inventory_item_desc', this.item.description)
    cy.contains('.inventory_item_price', this.item.price)
  })
})

// import json file directly
it('has an item with details(import json file directly)', () => {
  cy.contains('.inventory_item', item.name).within(() => {
    cy.contains('.inventory_item_desc', item.description)
    cy.contains('.inventory_item_price', item.price)
  })
})
