import { encode } from 'gpt-3-encoder'; // Example library
import faiss from 'faiss-node';

const index = new faiss.IndexFlatL2(768); // Adjust dimensions

export const addToVectorDB = (text) => {
  const embedding = encode(text);
  index.add([embedding]);
};

export const searchVectorDB = (queryEmbedding) => {
  return index.search([queryEmbedding], 5); // Top 5 results
};