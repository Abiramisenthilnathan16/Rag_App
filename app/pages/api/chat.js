import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchVectorDB } from '../../utils/embeddings';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  const { query } = JSON.parse(req.body);
  const queryEmbedding = encode(query);
  const results = searchVectorDB(queryEmbedding);

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Context: ${results.join(' ')}\n\nQuestion: ${query}`;
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  res.status(200).json({ response });
}