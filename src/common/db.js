import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://ev3_express:qt2yc3VyNaeQyGkZ@cluster-express.fybpz.mongodb.net/pelicula?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
    tls: true,  // Asegura que la conexión use TLS
    tlsAllowInvalidCertificates: false,  // Rechaza certificados inválidos (si es el caso)
});


export default client

