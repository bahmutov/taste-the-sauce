import InventoryListItem from './InventoryListItem'
import { InventoryData } from '../utils/InventoryData'

describe('InventoryListItem', () => {
  it('adds an item to the cart', () => {
    // pick an item from the inventory list
    //
    // mount the InventoryListItem component
    // passing the item properties (use the spread operator)
    //
    // confirm the inventory item is present on the page
    // and has the expected attribute "data-itemid" with the correct id
    //
    // find the button "Add to cart"
    // and click on it
    //
    // confirm the button changes to "Remove"
    //
    // Confirm the item was added to the cart
    // we could check the local storage
    // to see if cart contents is a list [3]
    // OR we could ask the application's code
    // by importing the ShoppingCart component
    // and invoking its methods, like getCartContents()
    // and isItemInCart(item id)
  })
})
