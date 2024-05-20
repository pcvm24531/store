import express from "express";
import { mockUsers } from "./utils/constants.mjs";
import "dotenv/config"

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Runnin on port ${PORT}`);
})

//Ejemplo con query paramas
app.get(
    '/v0/users',
    (request, response)=>{
        console.log(request.query);
        const  {
            query: {filter, value}
        }=request;
        if(filter && value) return response.send(
                mockUsers.filter( (user)=>user[filter].includes(value) )
            );        
        return response.send(mockUsers);
    }
);

app.get(
    '/v0/users/:id',
    (request, response)=>{
        const paramID = parseInt( request.params.id );
        if (isNaN(paramID)) return response.status(400).send({msg:"Bad request"})
        
        const findUser = mockUsers.find( (user)=>user.id===paramID );
        if( !findUser ) return response.status(400).send({msg:"User not foud"})

        return response.status(201).send(findUser);
    }
);

app.post(
    '/v0/users',
    ( request, response )=>{
        console.log(request.body);
        const { body } = request;
        const newUser = { id:mockUsers[mockUsers.length-1].id+1, ...body };
        mockUsers.push(newUser);
        return response.status(200).send(newUser);
    }
);

app.put(
    '/v0/users/:id',
    (request, response)=>{
        const { 
            body, 
            params:{id} 
        } = request;

        const paramID = parseInt(id);
        if( isNaN(paramID) ) return response.sendStatus(400);

        const findUserIndex = mockUsers.findIndex( (user)=>user.id===paramID );;

        if(findUserIndex===-1) return response.sendStatus(404);

        mockUsers[findUserIndex] = { id:paramID, ...body };

        return response.sendStatus(200);
    }
);
