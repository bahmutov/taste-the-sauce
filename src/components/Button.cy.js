import Button from './Button'

it('shows a button', () => {
  // mount the Button component
  // and pass the label prop
  cy.mount(<Button label="Test button" />)
  cy.contains('button', 'Test button')
})
