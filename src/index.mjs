import express from "express";
import { mongoose } from "mongoose";
import "dotenv/config";
import { findAvailablePort } from "./utils/port.mjs";
import { mockUsers } from "./utils/contants.mjs";

const app = express();

app.use(express.json);
const PORT = process.env.PORT || 3000;
const DB_CONN = process.env.DB_URI;

//Conexión DB
mongoose.connect( DB_CONN )
    .then( ()=> console.log('DB Connected..') )
    .catch( (err)=> console.log(`Error:${err}`) );

//Verificamos si hay puerto disponible
findAvailablePort(PORT)
    .then( port=>{
        app.listen( port, ()=>{
            console.log(`Servidor http://localhost:${port}`);
        } );
    });

app.get(
    "/api/users",
    (request, response)=>{
        response.status(200).send(mockUsers);
    }
);

app.get(
    "/api/users/:id",
    (request, response)=>{
        const userId = parseInt(request.params.id);
        if( isNaN(userId) ) return response.status(400).send({msg:'Bad Request. Invalid ID'})
        
        const findUser = mockUsers.find( (user)=> user.id===userId );

        if(!findUser) return response.status(404).send({msg:'Not Found. The server cannot find.'})
        
        response.status(200).send(findUser);
    }
);
//Inicio query params
/*app.get(
    '/api/users',
    (request, response)=>{
        const { 
            query: {filter, value} ,
        } = request;

        if( filter && value ) 
            return response.send(
                mockUsers.filter( (user)=>user[filter].includes(value) )
            );

        return response.status(200).send(mockUsers);
    }
);*/
/*Fin query params */
