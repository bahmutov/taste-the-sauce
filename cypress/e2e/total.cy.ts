import { LoginPage } from './login.page'
import { LoginInfo } from '.'
import { InventoryData } from '../../src/utils/InventoryData'

describe('Checkout', () => {
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

  it('shows the right total price', { viewportHeight: 1200 }, () => {
    // pick random 3 items from the InventoryData array
    // https://lodash.com/docs
    // Tip: I told you Lodash is a super neat library
    const pickedItems = Cypress._.sampleSize(InventoryData, 3)
    // grab the "id" property from each item in the picked items
    // Tip: I told you Lodash is a super neat library
    const ids = Cypress._.map(pickedItems, 'id')
    // set the ids in the local storage item "cart-contents"
    // Tip: local storage usually has stringified data
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))

    // visit the page checkout-step-one.html directly
    // skipping the inventory page
    // https://on.cypress.io/visit
    cy.visit('/checkout-step-one.html')

    // fill the check out form with values "Joe Smith 90210"
    // and submit the form
    cy.fillForm()
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
})
