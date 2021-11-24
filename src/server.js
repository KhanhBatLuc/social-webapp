import express from "express";
import { connectDB } from "*/config/mongodb";
import {env} from "*/config/enviroment"
import { api } from "*/routes"
import bodyParser from "body-parser"
import client from "*/config/redis"
import createError from "http-errors"
// connect server redis


// connect db
connectDB()
  .then(() => console.log('connect db success'))  
  .then(() => bootServer())
  .catch(error => {
    console.log(error)
    // when connect fail , instantly stop app
    process.exit(1)
  })

// Initalize server when connect db success
const bootServer =  () => {

  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))

  // parse application/json
  app.use(bodyParser.json())

  app.use('/api/v1', api)
  //with router not found 404
  app.use((req, res, next) => {
    const error = createError.BadRequest('This page does not exits >')
    next(error)
  })
// midlware handle Error 
  app.use((error, req, res, next) => {
    res.json({
      status: error.status || 400,
      message:error.message
    })
  })

  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`app running http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

}