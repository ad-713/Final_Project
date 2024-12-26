import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const movieSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    releaseDate: Joi.string().required(),
    genre: Joi.string().required()
});

export const validateMovie = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
};