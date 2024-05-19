import { db } from "../config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// Function to check if a category already exists
async function categoryExists(categoryName) {
  const q = query(
    collection(db, "categories"),
    where("name", "==", categoryName)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

// Function to check if a product already exists within a category
async function productExists(productName, categoryId) {
  const q = query(
    collection(db, "products"),
    where("name", "==", productName),
    where("categoryId", "==", categoryId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export async function addCategory(category) {
  try {
    if (category.name === "" || category.name === undefined) {
      return console.log("Category name is undefined");
    }

    const exists = await categoryExists(category.name);
    if (exists) {
      console.log("Category already exists");
      return null;
    }

    const docRef = await addDoc(collection(db, "categories"), {
      ...category,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addProduct(product, categoryId) {
  try {
    const exists = await productExists(product.name, categoryId);
    if (exists) {
      console.log("Product already exists in this category");
      return null;
    }

    const docRef = await addDoc(collection(db, "products"), {
      categoryId,
      ...product,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Get all products from category
 * @returns {Array} List of products
 *
 */
export async function getProductsByCategory(categoryName) {
  const q = query(
    collection(db, "categories"),
    where("name", "==", categoryName)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const categoryDoc = querySnapshot.docs[0];
    const productsQuery = query(
      collection(db, "products"),
      where("categoryId", "==", categoryDoc.id)
    );
    const productsSnapshot = await getDocs(productsQuery);

    let products = [];
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } else {
    console.log("No such category found");
    return [];
  }
}

export async function getAllProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);

  let products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}
