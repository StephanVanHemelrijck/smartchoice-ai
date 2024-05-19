import * as tf from "@tensorflow/tfjs";
import { generateTrainingData } from "./generateTrainingData";
import { initializeMappings, getFeatureVector } from "./featureExtraction";
import { getAllProducts } from "../lib/firestore";

let modelPromise = setupModel();

tf.setBackend("webgl").then(() => {
  console.log("WebGL backend set up");
});

async function setupModel() {
  try {
    console.log("Fetching products");
    const products = await getAllProducts();
    console.log("Products fetched");

    if (!products || products.length === 0) {
      throw new Error("No products available for training.");
    }

    initializeMappings(products);
    console.log("Mappings initialized");

    const { trainData, labels } = generateTrainingData(products);
    console.log("Training data generated");

    if (!trainData || !labels) {
      throw new Error("Training data or labels are null.");
    }

    const inputSize = trainData.shape[1] / 2;

    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 32,
        activation: "relu",
        inputShape: [inputSize * 2],
      })
    );
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "linear" }));

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });
    console.log("Model compiled");

    await model.fit(trainData, labels, {
      epochs: 10,
      batchSize: 64,
      validationSplit: 0.2,
      verbose: 1,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1} completed. Loss: ${logs.loss}`);
        },
      },
    });

    console.log("Model trained");
    return model;
  } catch (error) {
    console.error("Error setting up the model:", error);
    throw error;
  }
}

export async function calculateSimilarities(visitedVector, allProductVectors) {
  console.log("calculating");
  const model = await modelPromise;
  console.log("model loaded");
  const inputSize = visitedVector.length;

  // Prepare input tensor for batch processing
  const combinedVectors = allProductVectors.map(({ vector }) => [
    ...visitedVector,
    ...vector,
  ]);
  const combinedTensor = tf.tensor2d(combinedVectors);

  // Make batch predictions
  const predictions = model.predict(combinedTensor).dataSync();

  // Map predictions back to product IDs
  const similarities = allProductVectors.map(({ productId }, index) => {
    return { productId, similarity: predictions[index] };
  });

  console.log(similarities);

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
}
