"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovie = void 0;
const joi_1 = __importDefault(require("joi"));
const movieSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    director: joi_1.default.string().required(),
    year: joi_1.default.number().integer().min(1888).max(new Date().getFullYear()).required(),
    genre: joi_1.default.array().items(joi_1.default.string()),
    rating: joi_1.default.number().min(0).max(10),
    description: joi_1.default.string()
});
const validateMovie = (req, res, next) => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
};
exports.validateMovie = validateMovie;
