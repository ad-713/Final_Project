import express, { Request, Response } from 'express';
import { movies } from './data.ts'; // Assuming movies data is imported from data.ts
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Movie API!');
});

// GET all movies
app.get('/api/movies', (req: Request, res: Response) => {
    res.json(movies);
});

// GET movie by id
app.get('/api/movies/:id', (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
