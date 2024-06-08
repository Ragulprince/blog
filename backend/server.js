const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors package

const blogRoutes = require('./routes/blogs');
const featuredStoryRoutes = require('./routes/featuredStories');
const moreStoryRoutes = require('./routes/moreStories');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Define Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/featuredStories', featuredStoryRoutes);
app.use('/api/moreStories', moreStoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
