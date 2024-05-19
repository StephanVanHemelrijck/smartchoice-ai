"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { trackProductVisit } from "@/utils/tracking";

const ProductCard = ({ product, visitProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProductClick = () => {
    trackProductVisit(product.id);
    visitProduct(product.id);
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        toggleModal();
        handleProductClick();
      }}
    >
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
        <p className={styles.cardText}>Colour: {product.colour}</p>
        <p className={styles.cardPrice}>{product.price?.current.text}</p>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h3>{product.name}</h3>
            <div className={styles.imageContainer}>
              <Image
                src={`https://${product.imageUrl}`}
                alt={product.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "16rem", height: "auto", objectFit: "contain" }}
                priority={true}
              />
            </div>
            <p>Brand: {product.brandName}</p>
            <p>Colour: {product.colour}</p>
            <p>{product.price?.current.text}</p>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
