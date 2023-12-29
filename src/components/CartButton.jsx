import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ShoppingCart } from '../utils/shopping-cart'
import { ROUTES } from '../utils/Constants'
import './CartButton.css'

const CartButton = (props) => {
  const { history } = props
  let cartBadge = ''
  const [cartContents, setCartContents] = useState(
    ShoppingCart.getCartContents(),
  )
  const cartListener = {
    forceUpdate: () => setCartContents(ShoppingCart.getCartContents()),
  }

  useEffect(() => {
    ShoppingCart.registerCartListener(cartListener)
  }, [])

  if (cartContents.length > 0) {
    cartBadge = (
      <span className="shopping_cart_badge" data-test="CartBadge">
        {cartContents.length}
      </span>
    )
  }

  return (
    <a className="shopping_cart_link" onClick={() => history.push(ROUTES.CART)}>
      {cartBadge}
    </a>
  )
}

CartButton.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(CartButton)
