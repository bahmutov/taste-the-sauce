export class ShoppingCart {
  /**
   * Adds an item by id
   * @param {number} itemId
   */
  static addItem(itemId) {
    // pull out our current cart contents
    const curContents = ShoppingCart.getCartContents()

    const item = curContents.find((x) => x.id === itemId)
    if (!item) {
      // Item's not yet present - add it now
      curContents.push({ id: itemId, n: 1 })

      // We modified our cart, so store it now
      ShoppingCart.setCartContents(curContents)
    }
  }

  static removeItem(itemId) {
    // pull out our current cart contents
    const curContents = ShoppingCart.getCartContents()
    const itemIndex = curContents.findIndex((x) => x.id === itemId)

    if (itemIndex >= 0) {
      // Remove this item from the array
      curContents.splice(itemIndex, 1)

      // We modified our cart, so store it now
      ShoppingCart.setCartContents(curContents)
    }
  }

  static isItemInCart(itemId) {
    // pull out our current cart contents
    const curContents = ShoppingCart.getCartContents()

    // If the item is in the array, return true
    return Boolean(curContents.find((x) => x.id === itemId))
  }

  static setQuantity(id, n) {
    // get the current cart contents
    const curContents = ShoppingCart.getCartContents()
    // find the item id property "id" equal to the value id
    const item = curContents.find((x) => x.id === id)
    // console.log({ id, n, curContents, item })
    // do nothing if there is no such item
    if (!item) {
      return
    }
    // change the "n" property to the argument n
    item.n = n
    // We modified our cart, so store it now
    ShoppingCart.setCartContents(curContents)
  }

  static getCartContents() {
    // pull out our current cart contents
    let curContents = window.localStorage.getItem('cart-contents')

    // Make an empty list if this is the first item
    if (curContents == null) {
      curContents = []
    } else {
      // We have an existing cart, so deserialize it now since localStorage stores in JSON strings
      curContents = JSON.parse(curContents)
    }

    return curContents
  }

  static setCartContents(newContents) {
    window.localStorage.setItem('cart-contents', JSON.stringify(newContents))

    // Notify our listeners
    ShoppingCart.LISTENERS.forEach((curListener) => {
      curListener.forceUpdate()
    })
  }

  static resetCart() {
    window.localStorage.removeItem('cart-contents')

    // Notify our listeners
    ShoppingCart.LISTENERS.forEach((curListener) => {
      curListener.forceUpdate()
    })
  }

  static registerCartListener(handler) {
    ShoppingCart.LISTENERS.push(handler)
  }
}

ShoppingCart.LISTENERS = []

/* istanbul ignore else */
if (window.Cypress) {
  // allow Cypress tests to call ShoppingCart methods
  // and access its data
  window.ShoppingCart = ShoppingCart
}
