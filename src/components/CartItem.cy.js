import CartItem from './CartItem'
import { InventoryData } from '../utils/InventoryData'
// want to make the item look just like the inventory list
// that is on the cart page?
// import the inventory list item CSS

describe('CartItem', () => {
  it('shows a cart item', () => {
    // pick an item from the inventory list
    //
    // mount the cart item (with the router), passing the item as a prop
    //
    // confirm the item is on the page
    // and the quantity is 1
    //
    // confirm the name of the item is shown in red
    // meaning the inventory item CSS style has been applied
    // "have.css", "color", RGB triple
  })

  it('removes a cart item', () => {
    // pick an item from the inventory list
    //
    // mount the cart item (with the router), passing the item as a prop
    // and with showButton=true prop to show the "Remove" button
    //
    // in the cart item find the Remove button and click it
    //
    // the cart item should be gone
    //
    // and an element with class "removed_cart_item" should be there instead
  })
})
