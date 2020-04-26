import { Router } from 'express';

import MoviesController from './controller/Movies';

const routes = new Router();

routes.get('/movies', MoviesController.index);
routes.get('/movies/:id', MoviesController.show);
routes.post('/movies/:id/like', MoviesController.store);

routes.use('*', (req, res) => res.status(404).json());

export default routes;
