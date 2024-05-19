"use client";
import ProductCard from "@/component/ProductCard";
import ProductList from "@/component/ProductList";
import { addCategory, addProduct, getAllProducts } from "@/lib/firestore";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

    //   const fetchProducts = async () => {
    //     const categoryId = 4199;

    //     const res = await fetch(
    //       "https://asos2.p.rapidapi.com/products/v2/list" +
    //         `?store=${"US"}&offset=${0}&categoryId=${categoryId}&limit=${48}&country=${"US"}&sort=${"freshness"}&currency=${"USD"}&sizeSchema=${"US"}&lang=${"en-US"}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "X-RapidAPI-Key":
    //             "aa5cffdb09msh4f5c018a346f3f2p1e8eacjsn0a2ebbbd65c4",
    //           "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    //         },
    //       }
    //     );
    //     const data = await res.json();
    //     // add category
    //     const category = { name: data.categoryName, id: categoryId };
    //     console.log(category);
    //     const products = data.products;
    //     console.log(products);

    //     addCategory(category);
    //     // add products
    //     products.forEach((product) => {
    //       addProduct(product, 4209);
    //     });

    //     console.log(data);
    //     setProducts(data);
    //     setLoading(false);
    //   };
    //   fetchProducts();

    const fetchProducts = async () => {
      const products = await getAllProducts();
      console.log(products);
      setProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="h-10 text-2xl">Recommended for you</h1>
      <hr className="pb-4" />

      <h1 className="h-10 text-2xl">All Web Products</h1>
      <hr className="pb-4" />
      <ProductList products={products} />
    </div>
  );
}
