import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'

describe('Problem user', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    const user: LoginInfo = Cypress.env('users').problem
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
  })

  it('cannot sort', () => {
    cy.log('**initial sort is A to Z**')
    InventoryPage.confirmSorted('az')
    cy.log('**change the sort to Low High**')
    InventoryPage.selectSort('lohi')
    cy.log('**initial sort remains A to Z**')
    InventoryPage.confirmSorted('az')
  })
})
