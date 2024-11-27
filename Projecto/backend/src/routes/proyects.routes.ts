import express from 'express';

const proyectRouter = express.Router();

// Todas las rutas que lleguen aquí YA TIENEN /rooms

proyectRouter.get('/', (req, res) => {
  res.send('todas las proyect');
});

proyectRouter.get('/:roomId', (req, res) => {
  res.send({ id: 1, title: 'Super habitación' });
});

proyectRouter.post('/', (req, res) => {
  res.send('proyect añadida');
});

proyectRouter.delete('/:roomId', (req, res) => {
  res.send('room borrada');
});

export default proyectRouter;
