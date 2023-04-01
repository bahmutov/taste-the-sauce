import { ShoppingCart } from './shopping-cart'

describe('ShoppingCart', () => {
  // confirm the shopping cart is empty initially
  beforeEach(() => {
    // initially the cart should be an empty list
    // call the ShoppingCart.getCartContents
    // and confirm it is []
    expect(ShoppingCart.getCartContents()).to.deep.equal([])
  })

  it('adds items one by one', () => {
    // add items with id 1 and 4
    ShoppingCart.addItem(1)
    ShoppingCart.addItem(4)
    // get the shopping cart contents again
    // it should be [1, 4]
    expect(ShoppingCart.getCartContents()).to.deep.equal([
      { id: 1, n: 1 },
      { id: 4, n: 1 },
    ])
    // adding a duplicate item
    ShoppingCart.addItem(1)
    // the contents stay the same
    expect(ShoppingCart.getCartContents()).to.deep.equal([
      { id: 1, n: 1 },
      { id: 4, n: 1 },
    ])
  })

  it('overwrites the shopping cart', () => {
    // set the cart contents to be array [2, 5]
    ShoppingCart.setCartContents([2, 5])
    // get the shopping cart contents again
    // it should be [2, 5]
    expect(ShoppingCart.getCartContents()).to.deep.equal([2, 5])
  })

  it('checks if an item is in the cart', () => {
    // set the cart contents to be array [2, 5]
    ShoppingCart.setCartContents([
      { id: 2, n: 1 },
      { id: 5, n: 1 },
    ])
    // confirm the shopping cart has item with id 2 and 5
    // but does not have an item with id 1
    expect(ShoppingCart.isItemInCart(2), 'item with id 2').to.be.true
    expect(ShoppingCart.isItemInCart(5), 'item with id 5').to.be.true
    expect(ShoppingCart.isItemInCart(1), 'item with id 1').to.be.false
  })

  it('removes an item by id', () => {
    // set the cart contents to be array [2, 5]
    ShoppingCart.setCartContents([
      { id: 2, n: 1 },
      { id: 5, n: 1 },
    ])
    // remove an item with id 2 from the cart
    ShoppingCart.removeItem(2)
    // the cart should have list [5]
    expect(ShoppingCart.getCartContents()).to.deep.equal([{ id: 5, n: 1 }])
    // removing non-existent item does not change anything
    ShoppingCart.removeItem(10001)
    expect(ShoppingCart.getCartContents()).to.deep.equal([{ id: 5, n: 1 }])
  })

  it('sets quantity', () => {
    ShoppingCart.addItem(101)
    ShoppingCart.setQuantity(101, 10)
    expect(ShoppingCart.getCartContents()).to.deep.equal([{ id: 101, n: 10 }])
    // set quantity for non-existent item
    ShoppingCart.setQuantity(4, 10)
    expect(ShoppingCart.getCartContents()).to.deep.equal([{ id: 101, n: 10 }])
  })

  it('saves the cart in the local storage', () => {
    // set the cart contents to be array [2, 5]
    const items = [2, 5]
    ShoppingCart.setCartContents(items)
    // get the local storage item "cart-contents"
    // it should be a string equal to the serialized items array
    // tip: all methods are synchronous, so we can directly
    // call the "localStorage.getItem" and compare the value
    expect(localStorage.getItem('cart-contents'), 'cart contents').to.equal(
      JSON.stringify(items),
    )
  })

  // Bonus: shopping cart can have listeners
  // that will be notified whenever something changes
  it('notifies the listeners on cart changes', () => {
    ShoppingCart.registerCartListener({
      forceUpdate: cy.stub().as('forceUpdate'),
    })
    ShoppingCart.addItem(10)
    ShoppingCart.addItem(20)
    cy.get('@forceUpdate').should('have.been.calledTwice')
  })

  it('resets the cart', () => {
    const items = [2, 5]
    ShoppingCart.setCartContents(items)
    expect(localStorage.getItem('cart-contents'), 'cart contents').to.be.a(
      'string',
    )
    ShoppingCart.registerCartListener({
      forceUpdate: cy.stub().as('forceUpdate'),
    })
    ShoppingCart.resetCart()
    expect(localStorage.getItem('cart-contents'), 'cart contents').to.be.null
    cy.get('@forceUpdate').should('have.been.calledOnce')
  })
})
