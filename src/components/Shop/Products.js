import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const product = {
        id:Math.random(),
       title:'Test',
       price:6,
      description:'This is a first product - amazing!',
  }
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
        products={product}
        />
      </ul>
    </section>
  );
};

export default Products;
