import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { CheckoutPage } from '@support/pages/checkout.page'
import { InventoryData } from '@fixtures/inventory-data'

const users = Cypress.env('users')
// pick a random item to buy
const item = Cypress._.sample(InventoryData)

describe('All users', () => {
  Cypress._.forEach(users, (user: LoginInfo, name) => {
    if (name === 'lockedOut') {
      return
    }
    it(`work for user ${name}`, () => {
      // - login
      LoginPage.login(user.username, user.password)

      // - add 1 item to the cart
      cy.visit('/inventory.html')
      InventoryPage.addItemToCart(item!.name)

      // - confirm the total price
      cy.visit('/checkout-step-one.html')
      CheckoutPage.fillInformationForm().submit()
      cy.location('pathname').should('equal', '/checkout-step-two.html')
      cy.get('.cart_list .cart_item').should('have.length', 1)
      cy.contains('.summary_subtotal_label', '$' + item?.price)
      cy.contains('[data-test=finish]', 'Finish').click()
      cy.location('pathname').should('equal', '/checkout-complete.html')
      cy.get('#checkout_complete_container').should('be.visible')
    })
  })
})
