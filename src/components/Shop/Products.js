import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const product = [{
        id:Math.random(),
       title:'book',
       price:600,
      description:'This is a first product - amazing!',
  },
  {
     id:Math.random(),
       title:'EarPhones',
       price:6000,
      description:'This is a second product - cool!',
  }
]
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
