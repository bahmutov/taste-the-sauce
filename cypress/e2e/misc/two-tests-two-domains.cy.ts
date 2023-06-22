import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

// make sure to start the second server
// using "npm run start:2nd" NPM alias
// It should host a page at "localhost:5555"
// with the name of the item the user won

// the name of the item will be set in the first test
let name: string

it('gets the item name', { baseUrl: 'http://localhost:5555' }, () => {
  // visit the base page of the second domain
  // https://on.cypress.io/visit
  cy.visit('/')
  // get the winning item name
  // and store it in the local variable "name"
  cy.get('.won')
    .invoke('text')
    .then((s) => {
      name = s
      cy.log(`won item ${name}`)
    })
})

it('has the winning item', () => {
  // we are back to the default "baseUrl"
  // print the name of the item we found in the first test
  cy.log(`checking item ${name}`)

  // log in using the LoginPage method
  const user: LoginInfo = Cypress.env('users').standard
  LoginPage.login(user.username, user.password)
  // visit the inventory page
  // and confirm it contains the winning item by name
  cy.visit('/inventory.html')
  cy.contains('.inventory_item', name)
    // scroll the winning item into the current viewport
    // https://on.cypress.io/scrollintoview
    .scrollIntoView()
    // Bonus: highlight the winning item by giving it a magenta border
    .invoke('css', 'border', '2px solid magenta')
})
