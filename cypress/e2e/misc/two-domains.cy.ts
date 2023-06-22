import { LoginPage } from '@support/pages/login.page'
import { LoginInfo } from '..'

// make sure to start the second server
// using "npm run start:2nd" NPM alias
// It should host a page at "localhost:5555"
// with the name of the item the user won
it('gets the item name from another domain', () => {
  // switch to the 2nd domain "http://localhost:555"
  // https://on.cypress.io/origin
  // visit the base page of the second domain
  // https://on.cypress.io/visit
  // get the winning item name
  // and yield it from the callback function
  //
  // get the subject string yielded by the cy.origin command
  // and print it to the Command Log
  // https://on.cypress.io/log
  // log in using the LoginPage method
  // visit the inventory page
  // and confirm it contains the winning item by name
  // scroll the winning item into the current viewport
  // https://on.cypress.io/scrollintoview
  // Bonus: highlight the winning item by giving it a magenta border
})
