import express from 'express';
import controllerActor from './controllerActor.js';

const routes = express.Router();


//Mapeo Rutas controllerActor

routes.post('/actor', controllerActor.handleInsertActorRequest);

routes.get('/actores', controllerActor.handleGetActorRequest);

routes.get('/actor/:id', controllerActor.handleGetActorByIdRequest);

routes.get('/actor/:pelicula', controllerActor.handleGetActorByPeliculaRequest);

//Exportando las rutas!!!!
export default routes;
