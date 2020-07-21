import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector} from 'reselect'

// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.css'
import { ToggleCartHidden } from '../../redux/cart/cart-actions';
import { SelectCartItemsCount } from '../../redux/cart/cart-selectors';


const CartIcon =({toggleCartHidden,itemCount})=>(
    <div className='cart-icon'onClick={toggleCartHidden}>
        {/* <ShoppingIcon className='shopping-icon' /> */}
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount : SelectCartItemsCount
});

const mapDispatchToProps = dispatch =>({
    toggleCartHidden : ()=> dispatch(ToggleCartHidden())
});

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);