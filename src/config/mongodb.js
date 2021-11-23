import { MongoClient } from "mongodb";
import { env } from "*/config/enviroment";

let dbInstance = null
//Initalize connection once
export const connectDB = async () => {
    // create new dictanct MongoClient
    const client = new MongoClient(env.URI, {    
        useUnifiedTopology: true,
        useNewUrlParser:true
    })
    // connect db
     await client.connect()
    //Assign clientDb to our Distance
    dbInstance = client.db(env.DATABASE_NAME)
    
}

 //get Database Instance
export const getDB = () => {
    // hasn't database
    if (!dbInstance) throw new Error('Must connect DB first .')
    // has database
    return dbInstance
 }




 