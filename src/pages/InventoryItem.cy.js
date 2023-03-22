import InventoryItem from './InventoryItem'
import { InventoryData } from '../utils/InventoryData'

describe('InventoryItem', { viewportHeight: 1000 }, () => {
  it('shows an item', () => {
    // what do you see when you try to mount the component?
    // cy.mount(<InventoryItem />)
    // what do you see when you mount the component by itself?
    // cy.mountWithRouter(<InventoryItem />)
    //
    // pick a random number between 0 and the inventory length
    // using Lodash Cypress._.random method
    const id = Cypress._.random(0, InventoryData.length - 1)
    // mount the InventoryItem component
    // passing your own search string "id=..."
    // Tip: modify the InventoryItem to read the window.location.search
    // or the passed search prop
    //
    cy.mountWithRouter(<InventoryItem search={'id=' + id} />)
    const item = InventoryData[id]
    // confirm the component shows the item's name, description, and price
    cy.get('.inventory_details_desc_container').within(() => {
      cy.contains('.inventory_details_name', item.name)
      cy.contains('.inventory_details_desc', item.desc)
      cy.contains('.inventory_details_price', '$' + item.price)
    })
  })

  it('adds an item to the cart and then removes it', () => {
    // mount an inventory item with id 1
    // cy.mountWithRouter
    //
    // find the button with text "Add to cart"
    // and click on it
    //
    // confirm the cart badge is visible and has 1
    // Tip: you can use page objects in this test
    //
    // find the button with text "Remove" and click on it
    //
    // the cart badge should be gone
  })
})
