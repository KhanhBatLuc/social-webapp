require('dotenv').config()

export const env = {
    URI: process.env.URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    ACCESS_TOKEN_TIME : process.env.ACCESS_TOKEN_TIME,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_TIME : process.env.REFRESH_TOKEN_TIME,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
}