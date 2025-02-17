import express from 'express';
import connectDB from './src/config/db.js';

import dotenv from 'dotenv';
dotenv.config();

// import routes
import authRoutes from './src/routes/auth.route.js';
import membershipRoutes from './src/routes/membership.route.js';
import gymRoutes from './src/routes/gym.route.js';
import reviewRoutes from './src/routes/review.route.js';

// connect db
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ping
app.get('/ping', (req, res) => {
    res.status(200).json({
      message: 'pong',
    });
});

// errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
})

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/membership', membershipRoutes);

// server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});