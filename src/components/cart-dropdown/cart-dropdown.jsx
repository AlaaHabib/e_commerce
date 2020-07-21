import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'

import CustomButton from '../custom-button/custom-button'
import './cart-dropdown.css'
import CartItem from '../cart-item/cart-item'
import { SelectCartItems } from '../../redux/cart/cart-selectors'
import { ToggleCartHidden } from '../../redux/cart/cart-actions'

const CartDropdown = ({ cartItems , history , dispatch }) =>(
    <div className="cart-dropdown">
        <div className='cart-items'> 
        {
            cartItems.length ? (
            cartItems.map(cartItem =>(
                <CartItem key={cartItem.id} item={cartItem}/>
            ))
            ):(
            <span className='empty-message'> Your cart is empty </span>
            )}
         </div>
        <CustomButton onClick={()=>
            {
                 history.push('/checkout');
                 dispatch(ToggleCartHidden());
            }}
            > GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps= createStructuredSelector({
    cartItems : SelectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));