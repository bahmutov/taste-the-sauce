import Button from './Button'

it('shows a button', () => {
  cy.mount(<Button label="Test button" />)
  cy.contains('button', 'Test button')
})
