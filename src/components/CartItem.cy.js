import CartItem from './CartItem'
import { InventoryData } from '../utils/InventoryData'
// want to make the item look just like the inventory list
// that is on the cart page?
// import the inventory list item CSS
import './InventoryListItem.css'

describe('CartItem', () => {
  it('shows a cart item', () => {
    // pick an item from the inventory list
    const item = InventoryData[2]
    // mount the cart item (with the router), passing the item as a prop
    cy.mountWithRouter(<CartItem item={item} />)
    // confirm the item is on the page
    // and the quantity is 1
    cy.get('.cart_item').within(() => {
      cy.contains('.cart_quantity', 1)
      // confirm the name of the item is shown in red
      // meaning the inventory item CSS style has been applied
      // "have.css", "color", RGB triple
      cy.get('.inventory_item_name').should(
        'have.css',
        'color',
        'rgb(226, 35, 26)',
      )
    })
  })

  it('removes a cart item', () => {
    // pick an item from the inventory list
    const item = InventoryData[2]
    // mount the cart item (with the router), passing the item as a prop
    // and with showButton=true prop to show the "Remove" button
    cy.mountWithRouter(<CartItem item={item} showButton={true} />)
    // in the cart item find the Remove button and click it
    cy.get('.cart_item').contains('button', 'Remove').click()
    // the cart item should be gone
    cy.get('.cart_item').should('not.exist')
    // and an element with class "removed_cart_item" should be there instead
    cy.get('.removed_cart_item')
  })

  it('changes the item quantity', () => {
    // pick an item from the inventory list
    const item = InventoryData[2]
    // mount the cart item (with the router), passing the item as a prop
    //
    // confirm the item is on the page
    // and the quantity is 1 initially
    // and we change it to 5
  })
})
