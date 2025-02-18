import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { urls } = JSON.parse(req.body);
  const scrapedData = [];

  for (const url of urls.split(',')) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text();
    scrapedData.push({ url, text });
  }

  res.status(200).json({ data: scrapedData });
}