import express from 'express';
import { validateMovie } from '../middleware/validation';
import * as MovieService from '../services/movieService';

const router = express.Router();

router.get('/', (_req, res) => {
    const movies = MovieService.getAllMovies();
    res.json(movies);
});

router.get('/:id', (req, res) => {
    const movie = MovieService.getMovieById(Number(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
});

router.post('/', validateMovie, (req, res) => {
    const movie = MovieService.createMovie(req.body);
    res.status(201).json(movie);
});

router.put('/:id', validateMovie, (req, res) => {
    const movie = MovieService.updateMovie(Number(req.params.id), req.body);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
});

router.delete('/:id', (req, res) => {
    const deleted = MovieService.deleteMovie(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
});

export default router;