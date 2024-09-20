import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula";


const peliculaCollection = client.db('pelicula'.collection(Pelicula))

//Funcion Agregar Pelicula
async function handleInserPeliculaRequest(req, res) {

    let data = req.body
    let pelicula = Pelicula
    
    pelicula._id = data._id
    pelicula.nombre = data.nombre
    pelicula.generos = data.generos
    pelicula.anioEstreno = data.anioEstreno

    await peliculaCollection.inserOne(pelicula)
    .then((data) => {
        if(data === null) return res.status(400).send('error al guardar') 

        return res.status(201).send(data)
        })
    .catch ((e) => {return res.status(500).send({error:e}) })    
}


//Funcion busqueda peliculas
async function handleGetPeliculaRequest(req, res) {
    await peliculaCollection.find({}).toArray()
    .then((data) => {return res.status(200).send(data)})
    .catch((e) => { return res.status(500).send({ error: e })})    
}


//Funcion busqueda por ID
async function handleGetPeliculaByIdRequest(req, res) {
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
        return res.status(400).send('La ID no fue encontrada o esta mal ingresada')
    }    
}

//funcion para update
async function handleUpdatePeliculaByidRequest(req, res) {

    let id = req.params.id
    let pelicula = req.body

    try{
        let oid = ObjectId.createFromHexString(id)

        let query = { $set: pelicula }

        await peliculaCollection.updateOne( {_id: oid}, query)
        .then ((data) => {return res.status(200).send(data)})
        .catch((e) => {return res.status(400).send({ code: e.code})})

    }catch(e){
        return res.status(400).send('La ID no fue encontrada o esta mal ingresada')
    } 
}

//Funcion Eliminar pelicula por ID

async function handleDeletePeliculaByIdRequest(req, res) {

    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.deleteOne({ _id: oid})
        .then((data) => {return res.status(200).send(data)})
        .catch((e) => { return res.status(500).send({code: e.code})} )

    }catch(e){
        return req.status().send('La ID no fue encontrada o esta mal ingresada')
    }    
}

export default {
    handleDeletePeliculaByIdRequest,
    handleGetPeliculaByIdRequest,
    handleGetPeliculaRequest,
    handleInserPeliculaRequest,
    handleUpdatePeliculaByidRequest,
}