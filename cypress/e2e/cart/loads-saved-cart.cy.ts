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
  //
  // give the network intercept alias "cart"
  // https://on.cypress.io/as
  //
  // visit the cart page
  cy.visit('/cart.html')
  // confirm we are at the cart page and are not redirected anywhere else
  cy.location('pathname').should('equal', '/cart.html')
  // confirm the page requested the user cart
  // https://on.cypress.io/wait
  //
  // confirm that every item from the fixture cart "user-cart.json" is shown
  // and the number of items is correct
  // https://on.cypress.io/fixture
  //
  // there should be same number of items on the page
  // as loaded  from the fixture
  //
  // iterate over items in the fixture
  // each item has properties "id" and "n"
  // just like interface ItemInCart shows
  //
  // find the item cart item on the page with data item id attribute
  // equal to the item's "id" property
  //
  // find the quantity input element
  //
  // it should have value equal to the item's "n" property
  //
})
