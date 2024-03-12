import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartAction } from "../Store/CartSlice";


const CartItem = (props) => {
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const dispatch = useDispatch();

  const handleQtyChange = (id, action) => {
    if (action === "increment") {
      dispatch(cartAction.incrementQty(id));
    } else if (action === "decrement") {
      dispatch(cartAction.decrementQty(id));
    }
  };

  const items =
    itemsInCart &&
    itemsInCart.map((item) => (
      <li className={classes.item} key={item.id}>
        <header>
          <h3>{item.title}</h3>
          <div className={classes.price}>
            {/* ${total.toFixed(2)}{" "} */}
            <span className={classes.itemprice}>{item.qty * item.price}</span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            <span>{item.qty}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={() => handleQtyChange(item.id, "decrement")}>
              -
            </button>
            <button onClick={() => handleQtyChange(item.id, "increment")}>
              +
            </button>
          </div>
        </div>
      </li>
    ));

  return (
    // <li className={classes.item}>
    //   <header>
    //     <h3>{title}</h3>
    //     <div className={classes.price}>
    //       ${total.toFixed(2)}{' '}
    //       <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
    //     </div>
    //   </header>
    //   <div className={classes.details}>
    //     <div className={classes.quantity}>
    //       x <span>{quantity}</span>
    //     </div>
    //     <div className={classes.actions}>
    //       <button>-</button>
    //       <button>+</button>
    //     </div>
    //   </div>
    // </li>
    <>{items}</>
  );
};

export default CartItem;
