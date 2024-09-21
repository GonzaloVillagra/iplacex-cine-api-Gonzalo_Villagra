import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://ev3_express:qt2yc3VyNaeQyGkZ@cluster-express.fybpz.mongodb.net/pelicula?tls=true';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
    tls: true,
});


export default client

