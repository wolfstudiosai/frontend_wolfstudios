'use client';
import { portfolios } from './portfolioData'; // Assuming you have a mock DB or array of portfolios.

export default function handler(req, res) {
  const { slug } = req.query; // Get the slug from the query

  // Find the portfolio by slug
  const portfolio = portfolios.find((item) => item.slug === slug);

  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  if (req.method === 'GET') {
    // Return the portfolio if it exists
    res.status(200).json(portfolio);
  } else if (req.method === 'PUT') {
    // Handle portfolio update
    const { title, model, publication, dp, image } = req.body;

    // Update the portfolio fields
    portfolio.title = title || portfolio.title;
    portfolio.model = model || portfolio.model;
    portfolio.publication = publication || portfolio.publication;
    portfolio.dp = dp || portfolio.dp;
    portfolio.image = image || portfolio.image;

    res.status(200).json(portfolio);
  } else if (req.method === 'DELETE') {
    // Handle portfolio deletion
    const index = portfolios.findIndex((item) => item.slug === slug);
    portfolios.splice(index, 1); // Remove the portfolio from the array

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
