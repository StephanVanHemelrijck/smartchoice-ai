import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

const ProductList = ({ products, visitProduct }) => {
  return (
    <div className={styles.ProductList}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            visitProduct={visitProduct}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
