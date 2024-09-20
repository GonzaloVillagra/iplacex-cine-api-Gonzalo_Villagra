
import client from "../common/db.js";
import { ObjectId } from "mongodb";
import { Peliculas } from "../pelicula/pelicula.js";
import { peliculaCollection } from "../pelicula/controllerPelicula.js";


const actorCollection = client.db('pelicula').collection('Actores')

//Funcion para Agregar un Actor o Actriz
function handleInsertActorRequest(req, res) {
    let data = req.body;

    //Validacion de los datos solicitados
    if (!data.nombre || !data.edad || !data.nombrePelicula) {
        return res.status(400).send('Aun faltan datos: Nombre y Apellido , primer nombre, edad y pelicula son obligatorios');
        }
        
    //busqueda de la pelicula y creacion del actor o actriz   
    peliculaCollection.findOne({ nombre: data.nombrePelicula })
        .then((pelicula) => {if (!pelicula)
            {
                return res.status(400).send('Esa pelicula no esta dentro de nuestros registros');
            }
            
    //Luego de la confirmacion de los datos avanza a la creacion del Actor o Actriz 
            const actor = {
                _id: data._id, 
                nombre: data.nombre,
                edad: data.edad,
                estaRetirado: data.estaRetirado,
                premios: data.premios 
            };
            return actorCollection.insertOne(actor);
            })
        .then((result) => {
            if (result.insertedCount === 0) {
                return res.status(400).send('No fue posible crear el actor o actriz');
            }
            return res.status(201).send(result);
        })
        .catch((error) => {
            console.error('No se pudo Agregar el Actor o Actriz:', error);
            return res.status(500).send('Se produjo un error en el servidor');
        });
}

//Funcion busqueda peliculas
async function handleGetActorRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => {return res.status(200).send(data)})
    .catch((e) => { return res.status(500).send({ error: e })})
    
}

//Funcion busqueda por ID
async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)
        await peliculaCollection.findOne({ _id: oid })
        .then((data) => {
            if(data === null) return res.status(404).send(data)
                return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error: e.code})
        })
    }catch(e){
        return res.status(400).send('el Id no de la pelicula no fue encontrado')
    }    
}

//Funcion para Busqueda de Actor o Actriz por ID de la Pelicula
async function handleGetActorByPeliculaRequest(req, res) {

     let data = req.params.Peliculas
     try{
        let oid = ObjectId.createFromHexString(Peliculas)
        await peliculaCollection.findOne({Peliculas: oid})
        .then((data) => {
            if(data === null) return res.status(404).send(data)
                return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error: e.code})
        })
    }catch(e){
        return res.status(400).send('El id que se intento "actualizar" no fue encontrado o fue mal ingresado')
    }   
}
    
//Exportando las funciones!!!
export default{
    handleInsertActorRequest, 
    handleGetActorRequest,
    handleGetActorByIdRequest,
    handleGetActorByPeliculaRequest
}
