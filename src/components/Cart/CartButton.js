
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {cartAction} from '../Store/CartSlice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQty = useSelector((state)=>state.cart.itemsInCart)
  const Qty = cartQty && cartQty.length
  
  const handleCartToggle=()=>{
    dispatch(cartAction.cartToggle())
  }

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{Qty}</span>
    </button>
  );
};

export default CartButton;
