import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import routes from './src/pelicula/routes.js';


const PORT = process.env.PORT || 3000;
const app = express();


// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true}));
app.use(cors());

app.use('/api', routes);

app.get('/', (req, res) => {
    const message = "Bienvenido a la API REST para el control de las películas";
    return res.status(200).send(message);
});

await client.connect()
    .then(() => {
        console.log('Conectado al cluster');
        app.listen(PORT, () => {
            console.log(`Servidor está corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Ha ocurrido un error al conectar:', error);
    });

