import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { InventoryData } from '@fixtures/inventory-data'
import { CheckoutPage } from '@support/pages/checkout.page'

const user: LoginInfo = Cypress.env('users').glitch
// pick a random item to buy
const item = Cypress._.sample(InventoryData)

// why does this test work?
// it is a little bit strange and "jumpy" with weird delays
// can you make it fail if the performance is too slow?

it('works for performance glitch user', { viewportHeight: 1200 }, () => {
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html', { timeout: 10_000 })
  InventoryPage.addItemToCart(item!.name)
  cy.visit('/checkout-step-one.html')
  CheckoutPage.fillInformationForm().submit()
  cy.location('pathname').should('equal', '/checkout-step-two.html')
  cy.get('.cart_list .cart_item').should('have.length', 1)
  cy.contains('.summary_subtotal_label', '$' + item?.price)
  cy.contains('[data-test=finish]', 'Finish').click()
  cy.location('pathname').should('equal', '/checkout-complete.html')
  cy.get('#checkout_complete_container').should('be.visible')
})
