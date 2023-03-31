import React from 'react'
import Select from './Select'

it('shows the select component', () => {
  const options = [
    {
      key: 'a to z',
      value: 'A to Z',
    },
    {
      key: 'z to a',
      value: 'Z to A',
    },
  ]
  const activeOption = 'a to z'
  const selectOption = cy.stub().as('selectOption')
  const select = (e) => selectOption(e.target.value)

  // mount the Select component
  // passing options and the active option props
  // also pass a test id and "onChange" handler
  cy.mount(
    <Select
      options={options}
      activeOption={activeOption}
      testId="test-select"
      onChange={select}
    />,
  )
  // find the <select> element with your data test id
  // and select the "Z to A" option
  // https://on.cypress.io/select
  cy.get('select[data-test=test-select]').select('Z to A')
  // get the selectOption stub and confirm it was called
  // with the "z to a" argument
  cy.get('@selectOption').should('have.been.calledWith', 'z to a')
})

it('skips the data-test attribute', () => {
  const options = [
    {
      key: 'a to z',
      value: 'A to Z',
    },
    {
      key: 'z to a',
      value: 'Z to A',
    },
  ]
  const activeOption = 'a to z'
  // mount the select component with these props
  cy.mount(<Select options={options} activeOption={activeOption} />)
  // confirm the select HTML element does not have attribute "data-test"
  // https://glebbahmutov.com/cypress-examples/commands/assertions.html
  cy.get('select').should('not.have.attr', 'data-test')
  // positive test: mount the component but add testId prop
  cy.mount(
    <Select options={options} activeOption={activeOption} testId="my-select" />,
  )
  // confirm the select element has "data-test" attribute with expected value
  cy.get('select').should('have.attr', 'data-test', 'my-select')
})
