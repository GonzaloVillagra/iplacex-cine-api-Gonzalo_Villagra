import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import routes from './src/pelicula/routes.js';


const PORT = 3000 || 4000;
const app = express();


// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true}));
app.use(cors());

app.all('/', (req, res) => {return res.status(200).send('bienvenido al control de gustos')})
app.use('/api',  routes)

await client.connect()
.then(() =>{
    console.log('conectado al cluster')
    app.listen(PORT, () => {console.log(`servidor esta corriendo en http://localhost:${PORT}`);
        
    });

})
.catch(() => {
    console.log('Ha ocurrido un error al conectar')

})


app.get('/', (req, res) => {
    let message = "bienvenido a la Api Rest para el control de las peliculas";
    return res.status(200).send(message);
});
