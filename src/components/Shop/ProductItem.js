import { useDispatch,useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartAction } from "../Store/CartSlice";
import { useEffect } from "react";



const ProductItem = (props) => {
 const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    dispatch(cartAction.addToCart(product));
  };

  const productList = props.products.map((product) => (
    <li className={classes.item} key={product.id}>
      <Card>
        <header>
          <h3>{product.title}</h3>
          <div className={classes.price}>{product.price}</div>
        </header>
        <p>{product.description}</p>
        <div className={classes.actions}>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  ));

  return (
    // <li className={classes.item}>
    //   <Card>
    //     <header>
    //       <h3>{title}</h3>
    //       <div className={classes.price}>{price}</div>
    //     </header>
    //     <p>{description}</p>
    //     <div className={classes.actions}>
    //       <button onClick={()=>handleAddToCart(props)}>Add to Cart</button>
    //     </div>
    //   </Card>
    // </li>
    productList
  );
};

export default ProductItem;
