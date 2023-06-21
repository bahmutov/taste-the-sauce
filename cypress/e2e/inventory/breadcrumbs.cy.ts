import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'
import { InventoryData } from '../../../src/utils/InventoryData'

describe('Product', { viewportHeight: 1600 }, () => {
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

  it('shows breadcrumbs', () => {
    // pick a random item from the inventory data list
    //
    // and visit the item's page at "/inventory-item.html?id=..."
    // confirm the browser remains on the item's page
    // confirm the breadcrumbs are there showing the item's name
    cy.log('**go to inventory using breadcrumbs link**')
    // click on the breadcrumbs inventory link
    // and confirm the browser navigates to the inventory
  })
})
