import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://ev3_express:twwM37iM6Onhtzc6@cluster-express.fybpz.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
        }
    }
) 

export default client