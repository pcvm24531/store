import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();

router.get(
    '/v0/users',
    ( request, response )=>{
        response.status(200).send(mockUsers);
    }
);

router.get(
    '/v0/users',
    query("filter").isString().notEmpty().withMessage('Must not be empty')
        .isLength({min:3, max:10}).withMessage("Must be at least 3-10 characters"),
    (request, response)=>{
        const result = validationResult(request);
        
        if( result.isEmpty ) return response.status(404).send(result);

        const  {
            query: {filter, value}
        }=request;
        if(filter && value) return response.send(
                mockUsers.filter( (user)=>user[filter].includes(value) )
            );
        return response.send(mockUsers);
    }
);
//Agrega un nuevo registro
router.post(
    '/v0/users',
    checkSchema(createUserValidationSchema),
    ( request, response )=>{
        const result = validationResult(request);

        if( !result.isEmpty() ){ return response.status(400).send({errors: result.array()}); }

        const data = matchedData(request);
        const newUser = { id:mockUsers[mockUsers.length-1].id+1, ...data };
        mockUsers.push(newUser);
        return response.status(200).send(newUser);
    }
);

//Modifica por completo todos los datos del registro
router.put(
    '/v0/users/:id',
    resolveIndexByUserId,
    (request, response)=>{
        const { body, findUserIndex } = request;
        mockUsers[findUserIndex] = { id:mockUsers[findUserIndex].id, ...body };
        return response.sendStatus(200);
    }
);

//PATCH actualiza específicamente el campo sin tocar los otros campos
//o agrega un campo nuevo
router.patch(
    '/v0/users/:id',
    resolveIndexByUserId,
    (request, response)=>{
        const { body, findUserIndex } = request;
        mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
        return response.sendStatus(200);
    }
);

router.delete(
    '/v0/users/:id',
    (request, response)=>{
        const { params:{id} } = request;
        const paramID = parseInt(id);
        if( isNaN(paramID) ) return response.sendStatus(400);
        const findUserIndex = mockUsers.findIndex( (user)=>user.id===paramID );
        if(findUserIndex===-1) return response.sendStatus(404);
        mockUsers.splice(findUserIndex, 1);
        return response.sendStatus(200);
    }
);

//Get user by id
router.get(
    '/v0/users/:id',
    (request, response)=>{
        const paramID = parseInt( request.params.id );
        if (isNaN(paramID)) return response.status(400).send({msg:"Bad request"})
        
        const findUser = mockUsers.find( (user)=>user.id===paramID );
        if( !findUser ) return response.status(400).send({msg:"User not foud"})

        return response.status(201).send(findUser);
    }
);

export default router;