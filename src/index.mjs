import express from "express";
import 'dotenv/config';
import {findAvailablePosrt} from '../utils/port.mjs'
import mongoose from "mongoose";

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
