import { Movie } from '../types/movie.types';
import { movies } from '../data/movies';

export { movies }; // Re-export if other files depend on it.

export const getAllMovies = (): Movie[] => {
    return movies;
};

export const getMovieById = (id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
};

export const createMovie = (movieData: Omit<Movie, 'id'>): Movie => {
    const id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    const movie = { ...movieData, id };
    movies.push(movie);
    return movie;
};

export const updateMovie = (id: number, movieData: Partial<Movie>): Movie | null => {
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) return null;

    movies[index] = { ...movies[index], ...movieData };
    return movies[index];
};

export const deleteMovie = (id: number): boolean => {
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) return false;

    movies.splice(index, 1);
    return true;
};