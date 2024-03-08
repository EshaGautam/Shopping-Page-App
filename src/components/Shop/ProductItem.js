import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartAction} from '../Store/CartSlice';
import { useSelector } from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description } = props.products;
   const dispatch = useDispatch();

  const handleAddToCart=(props)=>{
   dispatch(cartAction.addToCart(props));
  }
 
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>{price}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={()=>handleAddToCart(props)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
