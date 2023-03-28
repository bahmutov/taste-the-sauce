import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'
import { CheckoutPage } from '@support/pages/checkout.page'
import { InventoryData } from '@fixtures/inventory-data'
import { InventoryPage } from '@support/pages/inventory.page'

describe('Checkout', { viewportHeight: 1200 }, () => {
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
  })

  it.only('shows the right total price', () => {
    // pick random 3 items from the InventoryData array
    // https://lodash.com/docs
    // Tip: I told you Lodash is a super neat library
    const pickedItems = Cypress._.sampleSize(InventoryData, 3)
    // grab the "id" property from each item in the picked items
    // Tip: I told you Lodash is a super neat library
    const ids = Cypress._.map(pickedItems, 'id').map((id) => ({ id, n: 1 }))
    // set the ids in the local storage item "cart-contents"
    // Tip: local storage usually has stringified data
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))

    // visit the page checkout-step-one.html directly
    // skipping the inventory page
    // https://on.cypress.io/visit
    cy.visit('/checkout-step-one.html')

    // fill the check out form with values "Joe Smith 90210"
    CheckoutPage.fillInformationForm().submit()
    // we should be on the checkout step two page
    // https://on.cypress.io/location
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    // the overview page shows the expected number of picked items
    cy.get('.cart_list .cart_item').should('have.length', pickedItems.length)
    // grab the "price" property from each picked item
    // using Lodash method _.map
    const prices = Cypress._.map(pickedItems, 'price')
    // and sum the prices to compute the expected total price
    // using Lodash method _.sum
    const sum = Cypress._.sum(prices)
    // print the picked prices and the computed sum
    // to the Command Log for clarity
    cy.log(prices.join(' + ') + ' = ' + sum)
    // confirm the page shows the expected item total
    cy.contains('.summary_subtotal_label', '$' + sum)
  })

  it('can purchase two bike lights', () => {
    const name = 'Sauce Labs Bike Light'
    // find the item in the inventory
    const item = Cypress._.find(InventoryData, { name })!
    // visit the inventory page
    cy.visit('/inventory.html')
    // use the inventory POM to add the item to the cart
    // and confirm the cart badge shows 1
    // before clicking on it
    InventoryPage.addItemToCart(item!.name)
    InventoryPage.getCartBadge().should('have.text', 1).click()
    // the app moves to the cart page
    cy.location('pathname').should('equal', '/cart.html')
    // where the cart item shows value 1
    // that you can change to 2
    cy.contains('.cart_item', name)
      .find('.cart_quantity')
      .should('have.value', 1)
      .type('{selectAll}2')
      .should('have.value', 2)
    // click the checkout button
    cy.contains('button', 'Checkout').click()
    // use the checkout POM to fill the user information and submit it
    CheckoutPage.fillInformationForm().submit()
    // the app moves to the checkout step two
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    // the cart item should have the item by name
    // with value of 2
    cy.contains('.cart_item', name)
      .find('.cart_quantity')
      .should('have.value', 2)
    // compute the expected price by multiplying the item's price by 2
    // the total item price should show the expected formatted price string
    cy.contains('.summary_subtotal_label', '$' + (item.price * 2).toFixed(2))
  })
})
