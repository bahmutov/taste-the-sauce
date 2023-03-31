import React from 'react'
import InputError, { INPUT_TYPES } from './InputError'

it('uses test id for several attributes', () => {
  cy.mount(
    <InputError
      isError={false}
      type={INPUT_TYPES.TEXT}
      value="Hello"
      testId="greeting"
    />,
  )
  // confirm the input element has id, name, and data-test attributes
  // all having value "greeting"
  cy.get('input')
    .should('have.attr', 'name', 'greeting')
    .and('have.attr', 'id', 'greeting')
    .and('have.attr', 'data-test', 'greeting')
})

it('does not set default test id', () => {
  cy.mount(<InputError isError={false} type={INPUT_TYPES.TEXT} value="Hello" />)
  // confirm the input element has no id, no name, and no data-test attributes
  // tip: how many times do you need to query the page?
  cy.get('input').should('not.have.attr', 'id')
  cy.get('input').should('not.have.attr', 'name')
  cy.get('input').should('not.have.attr', 'data-test')
})
