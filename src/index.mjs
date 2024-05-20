import express from "express";
import 'dotenv/config';
import {findAvailablePosrt} from './utils/port.mjs';
import mongoose from "mongoose";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

app.use(express.json);

const desiredPort = process.env.PORT ?? 3000;
const db_conn = process.env.DB_URI;

mongoose.connect( db_conn )
    .then( ()=>console.log('DB Connected!!') )
    .catch( (err)=>console.log(`Error:${err}`) );

findAvailablePosrt(desiredPort)
    .then(port=>{
        app.listen(port, ()=>{
            console.log(`Server listen on http://localhost:${port}`);
        })
    });

app.get( 
    '/v0/users',
    ( request, response )=>{
        console.log(`Llamada a la ruta: /v0/users`);
        return response.status(200).send( mockUsers );
    }
 );