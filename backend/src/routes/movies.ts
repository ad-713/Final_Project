    import express from 'express';
    import { validateMovie } from '../middleware/validation';
    import * as MovieService from '../services/movieService';

    const router = express.Router();

    /**
     * @swagger
     * /movies:
     *   get:
     *     summary: Retrieve all movies
     *     tags: [Movies]
     *     responses:
     *       200:
     *         description: A list of movies
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     */
    router.get('/', (_req, res) => {
        const movies = MovieService.getAllMovies();
        res.json(movies);
    });

    /**
     * @swagger
     * /movies/{id}:
     *   get:
     *     summary: Retrieve a movie by ID
     *     tags: [Movies]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the movie
     *     responses:
     *       200:
     *         description: A movie object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: Movie not found
     */
    router.get('/:id', (req, res) => {
        const movie = MovieService.getMovieById(Number(req.params.id));
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    });

    /**
     * @swagger
     * /movies:
     *   post:
     *     summary: Create a new movie
     *     tags: [Movies]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MovieInput'
     *     responses:
     *       201:
     *         description: Movie created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     */
    router.post('/', validateMovie, (req, res) => {
        const movie = MovieService.createMovie(req.body);
        res.status(201).json(movie);
    });

    /**
     * @swagger
     * /movies/{id}:
     *   put:
     *     summary: Update an existing movie
     *     tags: [Movies]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the movie to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MovieInput'
     *     responses:
     *       200:
     *         description: Movie updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       404:
     *         description: Movie not found
     */
    router.put('/:id', validateMovie, (req, res) => {
        const movie = MovieService.updateMovie(Number(req.params.id), req.body);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    });

    /**
     * @swagger
     * /movies/{id}:
     *   delete:
     *     summary: Delete a movie
     *     tags: [Movies]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the movie to delete
     *     responses:
     *       200:
     *         description: Movie deleted successfully
     *       404:
     *         description: Movie not found
     */
    router.delete('/:id', (req, res) => {
        const deleted = MovieService.deleteMovie(Number(req.params.id));
        if (!deleted) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted' });
    });

    export default router;
