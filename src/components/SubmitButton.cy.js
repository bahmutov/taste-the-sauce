import React from 'react'
// import the submit button component
import SubmitButton from './SubmitButton'

it('shows the submit button', () => {
  // mount the SubmitButton
  // passing value, custom class, and test id props
  cy.mount(
    <SubmitButton
      value="Continue"
      customClass="submit-button"
      testId="submit-it"
    />,
  )
  // confirm the component appears on the page
  // and has the expected value and attributes
  cy.contains('input.submit-button', 'Continue')
    .should('have.value', 'Continue')
    .and('have.attr', 'data-test', 'submit-it')
    .and('have.attr', 'id', 'submit-it')
    .and('have.attr', 'name', 'submit-it')
})

it('does not need a custom class', () => {
  cy.mount(<SubmitButton value="Continue" testId="submit-it" />)
  // confirm the input element _only_ has class attribute "submit-button"
  cy.get('input[value=Continue]').should('have.attr', 'class', 'submit-button')
})

it('does not set test id by default', () => {
  cy.mount(<SubmitButton value="Continue" />)
  // confirm the input element does not have "data-test" attribute
  cy.get('input[value=Continue]').should('not.have.attr', 'data-test')
})
