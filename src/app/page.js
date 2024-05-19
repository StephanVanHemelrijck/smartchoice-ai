"use client";
import ProductList from "@/component/ProductList";
import { addCategory, addProduct, getAllProducts } from "@/lib/firestore";
import { calculateSimilarities } from "@/utils/recommendation";
import { getVisitedProducts } from "@/utils/tracking";
import React, { useState, useEffect } from "react";
import { getFeatureVector } from "../utils/featureExtraction";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [visitedProductIds, setVisitedProductIds] = useState([]);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  const handleVisitedProduct = (productId) => {
    setVisitedProductIds((prev) => {
      const visitedProducts = prev.filter((id) => id !== productId);
      visitedProducts.unshift(productId);
      return visitedProducts;
    });
  };

  useEffect(() => {
    if (!loading || products.length != 0) return;

    // const fetchCategory = async () => {
    //   const res = await fetch(
    //     "https://asos2.p.rapidapi.com/categories/list" +
    //       `?country=${"US"}&lang=${"en-US"}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "X-RapidAPI-Key":
    //           "aa5cffdb09msh4f5c018a346f3f2p1e8eacjsn0a2ebbbd65c4",
    //         "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    //       },
    //     }
    //   );

    //   const data = await res.json();
    //   console.log(data);
    // };
    // fetchCategory();

    // const fetchProducts = async () => {
    //   const categoryId = 29614;

    //   const res = await fetch(
    //     "https://asos2.p.rapidapi.com/products/v2/list" +
    //       `?store=${"US"}&offset=${0}&categoryId=${categoryId}&limit=${48}&country=${"US"}&sort=${"freshness"}&currency=${"USD"}&sizeSchema=${"US"}&lang=${"en-US"}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "X-RapidAPI-Key":
    //           "aa5cffdb09msh4f5c018a346f3f2p1e8eacjsn0a2ebbbd65c4",
    //         "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   // add category
    //   const category = { name: data.categoryName, id: categoryId };
    //   console.log(category);
    //   const products = data.products;
    //   console.log(products);

    //   addCategory(category);
    //   // add products
    //   products.forEach((product) => {
    //     addProduct(product, categoryId);
    //   });

    //   console.log(data);
    //   setProducts(data);
    //   setLoading(false);
    // };
    // fetchProducts();

    const fetchProducts = async () => {
      const products = await getAllProducts();
      console.log(products);
      setProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (visitedProductIds.length === 0) return;

    const visitedProducts = visitedProductIds.map((productId) => {
      return products.find((product) => product.id === productId);
    });
    console.log(visitedProducts);
    setVisitedProducts(visitedProducts);
  }, [visitedProductIds, products]);

  useEffect(() => {
    if (visitedProducts.length > 0 && products.length > 0) {
      const lastVisitedProduct = products.find(
        (product) => product.id === visitedProducts[0].id
      );
      console.log(lastVisitedProduct);
      if (lastVisitedProduct) {
        const lastVisitedProductVector = getFeatureVector(lastVisitedProduct);
        console.log(lastVisitedProductVector);
        const productsVectors = products.map((product) => ({
          productId: product.id,
          vector: getFeatureVector(product),
        }));

        calculateSimilarities(lastVisitedProductVector, productsVectors).then(
          (recommendations) => {
            const recommendedProducts = recommendations.map((recommendation) =>
              products.find(
                (product) => product.id === recommendation.productId
              )
            );

            setRecommendedProducts(recommendedProducts);
            setLoadingRecommended(false);
          }
        );
      }
    }
  }, [visitedProducts, products]);

  useEffect(() => {
    const visitedProducts = getVisitedProducts();
    setVisitedProductIds(visitedProducts);
  }, [products]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {visitedProducts.length != 0 && (
        <>
          <h1 className="h-10 text-2xl">Recently Viewed</h1>
          <hr className="pb-4" />
          <ProductList products={visitedProducts} />

          <h1 className="h-10 text-2xl">Recommended For You</h1>
          <hr className="pb-4" />
          {loadingRecommended ? (
            <p>Training Model...</p>
          ) : (
            <ProductList products={recommendedProducts} />
          )}
        </>
      )}

      <h1 className="h-10 text-2xl">All Web Products</h1>
      <hr className="pb-4" />
      <ProductList products={products} visitProduct={handleVisitedProduct} />
    </div>
  );
}
