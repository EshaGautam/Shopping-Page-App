import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import { cartAction, sendCartData } from "./components/Store/CartSlice";
import { fetchCartData } from "./components/Store/CartSlice";

let isInitial = true;

function App() {
  const isCartVisible = useSelector((state) => state.cart.isCartVisible);
  const notification = useSelector((state) => state.cart.notification);
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const CartState = useSelector((state) => state.cart);
  const cartChanged = useSelector((state) => state.cart.cartChanged);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(cartChanged){
    dispatch(sendCartData(CartState))
  

        }
  }, [itemsInCart, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
   
    dispatch(fetchCartData());


  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
