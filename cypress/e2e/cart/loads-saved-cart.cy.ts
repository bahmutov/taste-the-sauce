import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

const user: LoginInfo = Cypress.env('users').standard

interface ItemInCart {
  id: string
  n: number
}

// Tip: read the Cypress Network testing guide before implementing this test
// https://on.cypress.io/network-requests

it('loads the saved cart contents', () => {
  LoginPage.login(user.username, user.password)
  // stub network call to "GET /user-cart" API endpoint
  // https://on.cypress.io/intercept
  // return fixture "cypress/fixtures/user-cart.json"
  cy.intercept('/user-cart', { fixture: 'user-cart.json' })
    // give the network intercept alias "cart"
    // https://on.cypress.io/as
    .as('cart')
  // visit the cart page
  cy.visit('/cart.html')
  // confirm we are at the cart page and are not redirected anywhere else
  cy.location('pathname').should('equal', '/cart.html')
  // confirm the page requested the user cart
  // https://on.cypress.io/wait
  cy.wait('@cart')
  // confirm that every item from the fixture cart "user-cart.json" is shown
  // and the number of items is correct
  // https://on.cypress.io/fixture
  cy.fixture('user-cart.json').then((items) => {
    // there should be same number of items on the page
    // as loaded  from the fixture
    cy.get('.cart_item').should('have.length', items.length)
    // iterate over items in the fixture
    // each item has properties "id" and "n"
    // just like interface ItemInCart shows
    items.forEach((item: ItemInCart) => {
      // find the item cart item on the page with data item id attribute
      // equal to the item's "id" property
      cy.get(`.cart_item[data-item-id=${item.id}]`)
        // find the quantity input element
        .find('.cart_quantity')
        // it should have value equal to the item's "n" property
        .should('have.value', item.n)
    })
  })
})
