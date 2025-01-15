const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Asegúrate de que el archivo db.json esté en el mismo nivel
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000; // Puerto dinámico para Heroku

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
