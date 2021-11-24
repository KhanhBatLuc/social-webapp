import jwt from "jsonwebtoken"
import { env } from "*/config/enviroment"


const generateToken = (sercertkey, data , expiresInTime) => {
    return new Promise(async (resolve, reject) => {
        try {         
            /** Object before modify 
             * {
                _id: new ObjectId("619cb6b69cf5921fea6536a4"),
                name: 'khanhnguyen',
                email: 'a@gmail.com',
                password: 'something...'
                }
             */
            const userData = {
                _id: data._id,
                name: data.name,
                email: data.email
            }
            // Generate a token like this
            jwt.sign(
                { data: userData },
                sercertkey,
                { algorithm: "HS256", expiresIn: expiresInTime },
                (error, token) => {
                    if (error) reject(error)
                    resolve(token)
                })            
         } catch (error) {
            reject(error)
        }
    })
}

const verifyToken = (tokenClient) => {
    return new Promise((resolve, reject) => {
            jwt.verify(tokenClient,env.REFRESH_TOKEN_SECRET, (error, payload) => {
                if (error) {
                    reject(error.message)
                }                
                resolve(payload)
            })            
    })
}

export const Jwt = {
    generateToken,
    verifyToken
}