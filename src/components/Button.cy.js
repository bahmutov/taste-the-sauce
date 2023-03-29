import React from 'react'
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
  cy.mount(<Button label="Test button" onClick={cy.stub().as('click')} />)
  // query the page to find the button with text "Test button"
  // and click on it
  // https://on.cypress.io/contains
  // https://on.cypress.io/click
  cy.contains('button', 'Test button').click()
  // get the "click" stub and confirm it was clicked once
  // https://on.cypress.io/get
  // https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
  cy.get('@click').should('have.been.calledOnce')
})

it('does not click the disabled button', () => {
  // mount the Button component
  // passing the "disabled" prop and on click handler stub
  // The "onClick" prop should be a Cypress Sinon stub function
  // with an alias "click"
  // https://on.cypress.io/stub
  // https://on.cypress.io/as
  cy.mount(<Button label="disabled" disabled onClick={cy.stub().as('click')} />)
  // query the button by text and confirm it is disabled
  // https://glebbahmutov.com/cypress-examples/commands/assertions.html
  cy.contains('button', 'disabled')
    .should('be.disabled')
    // Change Button.css to not allow cursor
    // when _any_ button is disabled
    // and confirm the button in this test has the expected cursor CSS
    .and('have.css', 'cursor', 'not-allowed')
    // click the button
    // Tip: you need to force Cypress to click the disabled element
    .click({ force: true })
  // get the click prop stub by its alias
  // and confirm it was never called
  cy.get('@click').should('not.be.called')
})
