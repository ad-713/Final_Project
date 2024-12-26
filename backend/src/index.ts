import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Movie API',
        endpoints: {
            movies: '/api/movies',
            movieById: '/api/movies/:id'
        }
    });
});

app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});