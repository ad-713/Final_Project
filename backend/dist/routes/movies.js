"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Movie_1 = __importDefault(require("../models/Movie"));
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    try {
        const movies = await Movie_1.default.find();
        res.json(movies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie_1.default.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', validation_1.validateMovie, async (req, res) => {
    const movieData = req.body;
    const movie = new Movie_1.default(movieData);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/:id', validation_1.validateMovie, async (req, res) => {
    try {
        const movie = await Movie_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie)
            return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie_1.default.findByIdAndDelete(req.params.id);
        if (!movie)
            return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = router;
