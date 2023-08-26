import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    return res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found!' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    // base de datos
    const newMovie = await MovieModel.create({ input: result })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: result })

    return res.json(updateMovie)
  }
}
