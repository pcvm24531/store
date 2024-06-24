import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const router = Router();

router.get(
    '/v0/users',
    async ( request, response )=>{
        const users = await User.find();
        try {
            response.status(200).send(users);
        } catch (error) {
            console.log( `Error: ${error}` );
            response.status(500).send('Error al obtener usuarios!');
        }        
    }
);

//Get user by id
router.get(
    '/v0/users/:id',
    resolveIndexByUserId,
    async (request, response)=>{
        response.send(mockUsers[parseInt(request.findUserIndex)]);
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
        } = request;
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
    async ( request, response )=>{
        const result = validationResult(request);

        if( !result.isEmpty() ){ return response.status(400).send({errors: result.array()}); }

        const body = matchedData(request);
        body.password = hashPassword(body.password);
        const newUser = new User(body);

        try {
            const savedUser = await newUser.save();
            console.log(savedUser);
            return response.status(201).send(savedUser);
        } catch (error) {
            console.log(error);
            return response.status(400);
        }        
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
    resolveIndexByUserId,
    (request, response)=>{
        const {body, findUserIndex} = request;
        mockUsers.splice(findUserIndex, 1);
        return response.sendStatus(200);
    }
);

export default router;