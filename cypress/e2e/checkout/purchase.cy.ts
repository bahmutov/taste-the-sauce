import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/login.page'
import { InventoryPage } from '@support/pages/inventory.page'
import { InventoryData } from '@fixtures/inventory-data'
import { CheckoutPage } from '@support/pages/checkout.page'

const users = Cypress.env('users')
// pick a random item to buy
const item = Cypress._.sample(InventoryData)

// for each user object, create its own test
// - login
// - add 1 item to the cart
// - confirm the total price
// - check out
