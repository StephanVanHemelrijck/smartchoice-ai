import * as tf from "@tensorflow/tfjs";
import { getFeatureVector } from "./featureExtraction";

export function generateTrainingData(products) {
  const featureVectors = products.map(getFeatureVector);
  const inputSize = featureVectors[0].length;

  let trainData = [];
  let labels = [];

  for (let i = 0; i < featureVectors.length; i++) {
    for (let j = i + 1; j < featureVectors.length; j++) {
      const vectorA = featureVectors[i];
      const vectorB = featureVectors[j];
      const similarityScore = calculateSimilarityScore(vectorA, vectorB);

      if (!isNaN(similarityScore)) {
        trainData.push([...vectorA, ...vectorB]);
        labels.push([similarityScore]);
      }
    }
  }

  return {
    trainData: tf.tensor2d(trainData),
    labels: tf.tensor2d(labels),
  };
}

function calculateSimilarityScore(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    console.error(
      "Vectors have different lengths:",
      vectorA.length,
      vectorB.length
    );
    return NaN;
  }

  for (let i = 0; i < vectorA.length; i++) {
    if (typeof vectorA[i] !== "number" || typeof vectorB[i] !== "number") {
      console.error("Non-numeric value detected:", vectorA[i], vectorB[i]);
      return NaN;
    }
  }

  const distance = Math.sqrt(
    vectorA.reduce((sum, val, idx) => sum + Math.pow(val - vectorB[idx], 2), 0)
  );

  return 1 / (1 + distance);
}
