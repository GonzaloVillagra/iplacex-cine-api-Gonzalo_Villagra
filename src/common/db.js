import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://ev3_express:qt2yc3VyNaeQyGkZ@cluster-express.fybpz.mongodb.net/pelicula?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
    serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
        }
    }
) 


export default client

