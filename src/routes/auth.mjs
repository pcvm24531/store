import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();

router.get(
    '/v0/auth',
    (request, response)=>{
        const{ 
            body:{
                username,
                password
            } 
        } = request;
        //console.log(User);
        const findUser = mockUsers.find( (user)=> user.userName===username );
        if( !findUser || findUser.password !== password) return response.status(401).send({msg:"Bad credential"});

        request.session.user = findUser;
        return response.status(200).send(findUser);
    }
);
export default router;