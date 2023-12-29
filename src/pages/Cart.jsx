import React from 'react'
import { withRouter } from 'react-router-dom'
import { ROUTES } from '../utils/Constants'
import { ShoppingCart } from '../utils/shopping-cart'
import { InventoryData } from '../utils/InventoryData'
import CartItem from '../components/CartItem'
import SwagLabsFooter from '../components/Footer'
import HeaderContainer from '../components/HeaderContainer'
import Button, { BUTTON_SIZES, BUTTON_TYPES } from '../components/Button'
import './Cart.css'
import useFetch from 'react-fetch-hook'

const Cart = ({ history }) => {
  const { isLoading, data } = useFetch('/user-cart', {
    headers: {
      Accept: 'application/json',
    },
  })

  if (isLoading) {
    return (
      <div id="page_wrapper" className="page_wrapper">
        <div id="contents_wrapper">
          <HeaderContainer secondaryTitle="Your Cart" />
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    )
  }

  if (!isLoading && data) {
    console.log(data)
    ShoppingCart.setCartContents(data)
  }

  const contents = ShoppingCart.getCartContents()

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle="Your Cart" />
        <div
          id="cart_contents_container"
          className="cart_contents_container"
          data-test="CartContents"
        >
          <div>
            <div className="cart_list">
              <div className="cart_quantity_label">QTY</div>
              <div className="cart_desc_label">DESCRIPTION</div>
              {contents.map((item, i) => (
                <CartItem key={i} item={InventoryData[item.id]} showButton />
              ))}
            </div>
            <div className="cart_footer">
              <Button
                label="Continue Shopping"
                onClick={(evt) => {
                  evt.preventDefault()
                  history.push(ROUTES.INVENTORY)
                }}
                size={BUTTON_SIZES.MEDIUM}
                testId="CartBackToShopping"
                type={BUTTON_TYPES.BACK}
              />
              <Button
                label="Checkout"
                // `checkout_button` has no style function
                // but is there for backwards compatibility
                customClass="checkout_button"
                onClick={(evt) => {
                  evt.preventDefault()
                  history.push(ROUTES.CHECKOUT_STEP_ONE)
                }}
                size={BUTTON_SIZES.MEDIUM}
                testId="CartCheckout"
                type={BUTTON_TYPES.ACTION}
                disabled={contents.length === 0}
              />
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  )
}

export default withRouter(Cart)
