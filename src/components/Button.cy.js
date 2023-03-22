import Button from './Button'

it('shows a button', () => {
  cy.mount(<Button label="Test button" />)
  cy.contains('button', 'Test button')
})

it('calls the click prop', () => {
  // mount the Button component
  // with label "Test button" and "onClick" prop
  // The "onClick" prop should be a Cypress Sinon stub function
  // with an alias "click"
  // https://on.cypress.io/stub
  // https://on.cypress.io/as
  //
  // query the page to find the button with text "Test button"
  // and click on it
  // https://on.cypress.io/contains
  // https://on.cypress.io/click
  //
  // get the "click" stub and confirm it was clicked once
  // https://on.cypress.io/get
  // https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
})
