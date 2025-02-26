import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with specific options
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Middleware to handle JSON data
app.use(express.json());

// Fake CMS Data
const cmsData = {
  about: "Welcome to Industrial Co. We provide cutting-edge solutions.",
  solutions: "Our solutions include AI-driven automation and industrial optimizations.",
  investors: "Investor relations are at the core of our growth strategy.",
  sustainability: "We prioritize eco-friendly solutions to reduce environmental impact.",
};

// API Routes
app.get('/api/about', (req, res) => res.json({ content: cmsData.about }));
app.get('/api/solutions', (req, res) => res.json({ content: cmsData.solutions }));
app.get('/api/investors', (req, res) => res.json({ content: cmsData.investors }));
app.get('/api/sustainability', (req, res) => res.json({ content: cmsData.sustainability }));

// Root Route
app.get('/', (req, res) => res.send('Backend for Industrial Website'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
