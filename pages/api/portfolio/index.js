'use client';
import { portfolios } from './portfolioData'; // Assuming you have a mock DB or array of portfolios.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, model, publication, dp, image } = req.body;

    // Create a new portfolio object with a generated id (you can generate a slug here if needed)
    const newPortfolio = {
      id: portfolios.length + 1, // Simple ID generation
      title,
      model,
      publication,
      dp,
      image,
      slug: title.toLowerCase().replace(/\s+/g, '-') // Simple slug generation (can be adjusted)
    };

    // Push the new portfolio to the database (mock data in this case)
    portfolios.push(newPortfolio);

    // Respond with the created portfolio
    res.status(201).json(newPortfolio);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
