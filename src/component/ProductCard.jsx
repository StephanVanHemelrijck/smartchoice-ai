import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Image
        src={`https://${product.imageUrl}`}
        alt={product.name}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "16rem", height: "auto", objectFit: "contain" }}
        priority={true}
      />
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>{product.name}</div>
        <p className={styles.cardText}>Brand: {product.brandName}</p>
        <p className={styles.cardPrice}>{product.price.current.text}</p>
      </div>
    </div>
  );
};

export default ProductCard;
