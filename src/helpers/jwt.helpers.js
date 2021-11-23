import jwt from "jsonwebtoken"

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

export const Jwt = {
    generateToken 
}