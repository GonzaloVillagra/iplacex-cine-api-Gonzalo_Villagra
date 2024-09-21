import express from 'express'
import controllerPelicula from './controllerPelicula.js'

const routes = express.Router()

routes.post('/pelicula', controllerPelicula.handleInsertPeliculaRequest)

routes.get('/Peliculas', controllerPelicula.handleGetPeliculaRequest)

routes.get('/pelicula/:id', controllerPelicula.handleGetPeliculaByIdRequest)

routes.put('/pelicula/:id', controllerPelicula.handleUpdatePeliculaByidRequest)

routes.delete('/pelicula/:id', controllerPelicula.handleDeletePeliculaByIdRequest)

export default routes


