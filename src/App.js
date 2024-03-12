import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'
import {useSelector,useDispatch } from "react-redux";
import { cartAction } from './components/Store/CartSlice';
import Cart from './components/Cart/Cart'


let isInitial = true;

function App() {
  const isCartVisible = useSelector((state) => state.cart.isCartVisible);
   const notification = useSelector((state) => state.cart.notification);
   const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const CartState = useSelector((state)=>state.cart)

  useEffect(() => {
     if (isInitial) {
       isInitial = false;
       return;
     }
    const sendingData = async () => {
      try {
        dispatch(
          cartAction.setNotification({
            status: "pending",
            title: "sending..",
            message: "sending data...",
          })
        );
        const response = await fetch(
          "https://cart-ae90b-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
      
            body: JSON.stringify(CartState),
          }
        );
        if (!response.ok) {
          throw new Error("Problem in sending data!");
        }
        dispatch(
          cartAction.setNotification({
            status: "success",
            title: "success",
            message: "Data sent successfully!",
          })
        );

       

      } catch (error) {
        dispatch(
          cartAction.setNotification({
            status: "error",
            title: "failed",
            message: "failed to send data!",
          })
        );
      }
    };
    
    sendingData();
  }, [itemsInCart, dispatch]);

  

  
 
 


  return (
    <>
   {notification && <Notification  title={notification.title} message={notification.message} status={notification.status}/>}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
