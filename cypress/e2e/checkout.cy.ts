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

  it('goes through the check out pages', { viewportHeight: 1200 }, () => {
    // grab the "id" property from each item in the InventoryData array
    // Tip: I told you Lodash is a super neat library
    const ids = Cypress._.map(InventoryData, 'id')
    // set the ids in the local storage item "cart-contents"
    // Tip: local storage usually has stringified data
    //
    // visit the cart page
    // https://on.cypress.io/visit
    //
    // confirm each item name is present
    // confirm the cart items list has the right number of elements
    //
    // click on the Checkout button
    //
    // we should be on the checkout step one page
    // https://on.cypress.io/location
    //
    // fill the check out form with values "Joe Smith 90210"
    // and click the "Continue" element after confirming
    // the "Continue" element has the right "value" attribute
    // https://on.cypress.io/within
    //
    // we should be on the checkout step two page
    //
    // the summary page shows the expected number of cart items
    //
    // find the "Finish" button and click on it
    // https://on.cypress.io/contains
    // tip: I like using cy.contains with selector and text
    // to avoid accidental text match and confirm the button's caption text
    //
    // we should be on the checkout complete page
    //
    // it shows the checkout complete component
    //
    // the application should have cleared the local storage item "cart-contents"
    // tip: the item you get from local storage should not exist
  })
})
