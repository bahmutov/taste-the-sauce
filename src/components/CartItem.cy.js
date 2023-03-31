import React from 'react'
import CartItem from './CartItem'
import { InventoryData } from '../utils/InventoryData'
// want to make the item look just like the inventory list
// that is on the cart page?
// import the inventory list item CSS
import './InventoryListItem.css'
import { ShoppingCart } from 'utils/shopping-cart'

describe('CartItem', () => {
  beforeEach(() => {
    // set the shopping cart contents before the test starts
    ShoppingCart.setCartContents([{ id: 2, n: 1 }])
  })

  it('shows a cart item', () => {
    // pick an item from the inventory list
    const item = InventoryData[2]
    // mount the cart item (with the router), passing the item as a prop
    cy.mountWithRouter(<CartItem item={item} />)
    // confirm the item is on the page
    // and the quantity is 1
    cy.get('.cart_item').within(() => {
      cy.get('.cart_quantity').should('have.value', 1)
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
    cy.mountWithRouter(<CartItem item={item} />)
    // confirm the item is on the page
    // and the quantity is 1 initially
    // and we change it to 5
    cy.get('.cart_item .cart_quantity')
      .should('have.value', 1)
      .type('{selectAll}5')
    // confirm the input field has the new value 5
    cy.get('.cart_item .cart_quantity').should('have.value', 5)
  })

  it('hides if there is no item', () => {
    // mount the Cart without an item
    // confirm the removed cart element exists on the page
    // Tip: you will need to fix the cart item source code
    cy.mountWithRouter(<CartItem />)
    cy.get('.removed_cart_item')
  })

  it('sets 0 if quantity is not a number', () => {
    // pick an item from the inventory list
    const item = InventoryData[2]
    // mount the cart item (with the router), passing the item as a prop
    cy.mountWithRouter(<CartItem item={item} />)
    // confirm the item is on the page
    // and the quantity is 1 initially
    // and try to delete the text to cause invalid number
    cy.get('.cart_item .cart_quantity')
      .should('have.value', 1)
      // Tip: https://on.cypress.io/type
      .type('{selectAll}{del}')
    // confirm the input field changes the value to 0
    cy.get('.cart_item .cart_quantity').should('have.value', 0)
  })
})
